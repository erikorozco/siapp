package com.siapp.services;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siapp.models.Role;
import com.siapp.models.UserTokenDetails;
import com.siapp.repositories.PermissionRepository;

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
			return permissionRepository.getRecordPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user);
		case "session":
			return permissionRepository.getSessionPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user);
		case "derivation":
			return permissionRepository.getDerivationPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user);
		case "nutritionSession":
			return permissionRepository.getNutritionSessionPermission(user.getAppUser().getTherapist().getId(), entityId) > 0 || isAdmin(user);
		case "admin":
			return isAdmin(user);
		case "super":
			return isSuperAdmin(user);
		default:
			return false;
		}
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

}
