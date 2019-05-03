package com.siapp.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.lists.RoleList;
import com.siapp.models.Role;
import com.siapp.services.RoleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/roles", description = "Role Module Controller", produces = "application/json")
@RequestMapping("/roles")
public class RoleController {
	
	@Autowired
	RoleService roleService;
	
	@ApiOperation(value = "Get all Roles", notes = "Returns a list of Role.class", response = RoleList.class, responseContainer="List")
    @GetMapping("/getAllRoles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
    
	@ApiOperation(value = "Create new Role", notes = "Returns a Role.class", response = Role.class)
    @PostMapping("/createRole")
    public Role createRole(@Valid @RequestBody Role role) {
    	return roleService.create(role);
    }
    
    @ApiOperation(value = "Get Role by ID", notes = "Returns a Role.class", response = Role.class)
    @GetMapping("/getRolet/{id}")
    public Role getRoleById(@PathVariable(value = "id") Integer id) {
        return roleService.findById(id);
    }
    
    @ApiOperation(value = "Update Role by ID", notes = "Returns a Role.class", response = Role.class)
    @PutMapping("/updateRole/{id}")
    public Role updateRole(@PathVariable(value = "id") Integer id, @Valid @RequestBody Role RoleDetails) {
        return roleService.update(id, RoleDetails);
    }
    
    @ApiOperation(value = "Delete Role by ID", notes = "Returns 200")
    @DeleteMapping("/deleteRole/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable(value = "id") Integer id) {
        return roleService.delete(id);
    }

}
