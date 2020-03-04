package com.siapp.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.lists.UserList;
import com.siapp.models.User;
import com.siapp.models.UserTokenDetails;
import com.siapp.services.CustomUserDetailsService;
import com.siapp.services.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value = "/users", description = "Users Module Controller", produces = "application/json")
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	CustomUserDetailsService tokenService;
	
	@GetMapping("/tokenDetails")
	public Map<String, Object> user(Principal principal) {
		UserTokenDetails user = tokenService.getUserTokenDetails();
	    if (user != null) {
	        Map<String, Object> details = new HashMap<>();
	        details.put("userId", user.getAppUser().getId().toString());
	        details.put("username", user.getAppUser().getUsername());
	        details.put("therapistId", user.getAppUser().getTherapist().getId().toString());
	        details.put("username", user.getAppUser().getId().toString());
	        details.put("name", user.getAppUser().getTherapist().getName());
	        details.put("lastName", user.getAppUser().getTherapist().getLast_name());
	        details.put("secondLasName", user.getAppUser().getTherapist().getSecond_last_name());
	        details.put("roles", user.getAppUser().getRoles());
	        
	        return details;
	    }
	    return null;
	}
	
	@GetMapping("/sso/me")
	public UserTokenDetails tokenDetails(Principal principal) {
		UserTokenDetails user = tokenService.getUserTokenDetails();
	    return user;
	}
	
	@ApiOperation(value = "Check username availability", notes = "Returns true if username is available", response = Boolean.class)
    @GetMapping("/checkUsernameAvailability/{username}")
    public Boolean checkUsernameAvailability(@PathVariable(value = "username") String username) {
        return userService.checkUsernameAvailability(username);
    }
	
    @ApiOperation(value = "Get all Users", notes = "Returns a list of User.class", response = UserList.class, responseContainer="List")
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
	@ApiOperation(value = "Create new User", notes = "Returns a User.class", response = User.class)
    @ApiResponses(value={
    		@ApiResponse(code=200,message="User Details Retrieved",response=UserList.class),
    		@ApiResponse(code=409,message="Username already exists", response=ResourceAlreadyExistsException.class)
	})
    @PostMapping("/createUser")
    public User createUser(@Valid @RequestBody User user) {
			return userService.create(user);	
    }
    
    @ApiOperation(value = "Get User by ID", notes = "Returns a User.class", response = User.class)
    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable(value = "id") Integer id) {
        return userService.findById(id);
    }
    
    @ApiOperation(value = "Update User by ID", notes = "Returns a User.class", response = User.class)
    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable(value = "id") Integer id, @Valid @RequestBody User userDetails) {
        return userService.update(id, userDetails);
    }
    
    @ApiOperation(value = "Update Status User by ID", notes = "Returns a User.class", response = User.class)
    @PutMapping("/updateUserStatus/{id}")
    public User updateUserStatus(@PathVariable(value = "id") Integer id) {
        return userService.updateStatus(id);
    }
    
    @ApiOperation(value = "Delete User by ID", notes = "Returns 200")
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Integer id) {
        return userService.delete(id);
    }
    
    @ApiOperation(value = "Find User by Username", notes = "Returns a User.class", response = User.class)
    @GetMapping("/findUserByName/{username}")
    public User findUserByName(@PathVariable(value = "username") String username) {
        return userService.findByUsername(username);
    }
    
}
