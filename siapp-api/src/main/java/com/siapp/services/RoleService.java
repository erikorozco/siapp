package com.siapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Role;
import com.siapp.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository roleRepository;
	
	public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
	
	public Role findById(Integer id){
		return roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));
	}
	
	public Role update(Integer id, Role roleDetails) {
		Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));
		role.setName(roleDetails.getName());
		
        return roleRepository.save(role);
	}
	
	public Role create(Role role) throws ResourceAlreadyExistsException {
		return roleRepository.save(role);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));

		roleRepository.delete(role);

        return ResponseEntity.ok().build();
	}
	
}
