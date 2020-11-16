package com.siapp.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siapp.models.Role;
import com.siapp.models.UserTokenDetails;
import com.siapp.repositories.PermissionRepository;
import com.siapp.utilities.PermissionUtil;
import com.siapp.utilities.PersonUtil;
import com.siapp.utilities.RecordUtil;

@Service
public class PermissionService  {
	
	@Autowired
	PermissionRepository permissionRepository;
	
	@Autowired
	CustomUserDetailsService tokenService;
	
	// TODO: Cambiar logica para inicializar el contructor
//	@PostConstruct
//    public void init() {
//		user = tokenService.getUserTokenDetails();
//	}
	
	public List<Integer> getAssignedRecrodsId(Integer therapistId) {
		return permissionRepository.getAssignedRecrodsId(therapistId);

	}
	
	public boolean isAllowedTo( String entity, Integer entityId) {
		UserTokenDetails user = tokenService.getUserTokenDetails();
		switch (entity) {
		case "record":
			return permissionRepository.getRecordPermission(user.getAppUser().getTherapist().getId(), entityId) > 0;
		case "session":
			return permissionRepository.getSessionPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isSuperAdmin(user);
		case "derivation":
			return permissionRepository.getDerivationPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user) || isSubadmin(user) || isAdminnistrative(user);
		case "nutritionSession":
			return permissionRepository.getNutritionSessionPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user);
		case "crisisIntervention":
			return permissionRepository.getCrisisInterventionPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user);
		case "admin":
			return isAdmin(user);
		case "super":
			return isSuperAdmin(user);
		default:
			return false;
		}
	}
	
	public HashMap<String, Boolean> getAllPermissions() {
		UserTokenDetails user = tokenService.getUserTokenDetails();
		
		Boolean isAdmin = this.isAdmin(user);
		Boolean isSuperAdmin = this.isSuperAdmin(user);
		List<Role> signedUserRoles = user.getAppUser().getRoles();
		
		List<HashMap<String, Object>> permissions = PermissionUtil.convertPermissionsArrayToObject(permissionRepository.getAllPermissions());
		
		return this.processPermissions(signedUserRoles, permissions, isAdmin, isSuperAdmin);
		
	}
	
	
	private HashMap<String, Boolean>  processPermissions(List<Role> signedUserRoles, List<HashMap<String, Object>> permissions, Boolean isAdmin, Boolean isSuperAdmin) {
		HashMap<String, Boolean> permissionsResult = new HashMap<String,Boolean>(); //List to return
		
		for (HashMap<String, Object> permission : permissions) {
			
			String permissionName = (String) permission.get("name");
			
			if (isAdmin || isSuperAdmin) {
				permissionsResult.put(permissionName, true);
			} else {
				List<String> permissionRoles = (List<String>) permission.get("roles"); // Get Roles
				permissionsResult.put(permissionName, this.getPermissionValue(permissionRoles, signedUserRoles));
			}
			
		}
		
		return permissionsResult;
	}
	
	private Boolean getPermissionValue(List<String> permissionAllowedRoles, List<Role> signedUserRoles) {
		
		
		for (Role role : signedUserRoles) {
			if (permissionAllowedRoles.indexOf(role.getName()) >= 0) {
				return true;
			}
		}
		return false;
	}
	
	
	private boolean isSuperAdmin(UserTokenDetails user) {
		user = tokenService.getUserTokenDetails();
		for (Role role : user.getAppUser().getRoles()) {
			if (role.getName().equals("SUPERADMIN")) {
				return true;
			}
		}
		return false;
	}

	private boolean isAdmin(UserTokenDetails user) {
		user = tokenService.getUserTokenDetails();
		for (Role role : user.getAppUser().getRoles()) {
			if (role.getName().equals("ADMIN") || role.getName().equals("SUPERADMIN")) {
				return true;
			}
		}
		return false;
	}
	
	private boolean isAdminnistrative(UserTokenDetails user) {
		user = tokenService.getUserTokenDetails();
		for (Role role : user.getAppUser().getRoles()) {
			if (role.getName().equals("ADMIN") || role.getName().equals("ADMINISTRATIVE")) {
				return true;
			}
		}
		return false;
	}
	
	private boolean isSubadmin(UserTokenDetails user) {
		user = tokenService.getUserTokenDetails();
		for (Role role : user.getAppUser().getRoles()) {
			if (role.getName().equals("ADMIN") || role.getName().equals("SUBADMIN")) {
				return true;
			}
		}
		return false;
	}

}
