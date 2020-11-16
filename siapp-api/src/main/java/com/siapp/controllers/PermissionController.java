package com.siapp.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siapp.lists.PersonList;
import com.siapp.models.Person;
import com.siapp.services.PermissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/permissions", description = "Permissions Module Controller", produces = "application/json")
@RequestMapping("/permissions")
public class PermissionController {
	
	@Autowired
	PermissionService permissionService;

    
    @ApiOperation(value = "Return true if the entity is assigned to the user or if user is ADMIN", notes = "Returns 200")
    @PostMapping("/isAllowedTo")
    public HashMap<String, Boolean> isAllowedToRecord(@RequestBody HashMap<String, Object> permissionRequest) {
    	HashMap<String, Boolean> permission = new HashMap<>();
    	Boolean isAllowed = permissionService.isAllowedTo((String)permissionRequest.get("entity"), (Integer)permissionRequest.get("entityId"));
    	permission.put("isAllowed", isAllowed);
    	return permission;
    }
    
    @ApiOperation(value = "Get permissions for signed user", notes = "Returns a list with tall the valid permission for the signed user")
	@GetMapping("/getAllPermissions")
	public HashMap<String, Boolean> getAllPermissions() {
	    return permissionService.getAllPermissions();
    }

}
