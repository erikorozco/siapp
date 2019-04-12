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
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;

import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.lists.UserList;
import com.siapp.models.User;
import com.siapp.services.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value = "/user", description = "Users Module Controller", produces = "application/json")
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;
	
    @ApiOperation(value = "Get all Users", notes = "Returns a list of User.class", response = UserList.class, responseContainer="List")
    @ApiResponses(value={
    		@ApiResponse(code=200,message="Users Details Retrieved",response=UserList.class),
    		@ApiResponse(code=500,message="Internal Server Error", response=InternalError.class),
    		@ApiResponse(code=401,message="Unauthorized", response=Unauthorized.class),
    		@ApiResponse(code=403,message="Forbidden", response=Forbidden.class),
    		@ApiResponse(code=404,message="Note not found", response=ResourceNotFoundException.class)
	})
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @ApiOperation(value = "Create new User", notes = "Returns a User.class", response = User.class)
    @ApiResponses(value={
    		@ApiResponse(code=200,message="Created User Retrieved",response=User.class),
    		@ApiResponse(code=500,message="Internal Server Error", response=InternalError.class),
    		@ApiResponse(code=401,message="Unauthorized", response=Unauthorized.class),
    		@ApiResponse(code=403,message="Forbidden", response=Forbidden.class),
    		@ApiResponse(code=404,message="Note not found", response=ResourceNotFoundException.class)
	})
    @PostMapping("/createUser")
    public User createUser(@Valid @RequestBody User user) {
        return userService.create(user);
    }
    
    @ApiOperation(value = "Get User by ID", notes = "Returns a User.class", response = User.class)
    @ApiResponses(value={
    		@ApiResponse(code=200,message="User Details Retrieved",response=User.class),
    		@ApiResponse(code=500,message="Internal Server Error", response=InternalError.class),
    		@ApiResponse(code=401,message="Unauthorized", response=Unauthorized.class),
    		@ApiResponse(code=403,message="Forbidden", response=Forbidden.class),
    		@ApiResponse(code=404,message="Note not found", response=ResourceNotFoundException.class)
	})
    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable(value = "id") Integer id) {
        return userService.findById(id);
    }
    
    @ApiOperation(value = "Update User by ID", notes = "Returns a User.class", response = User.class)
    @ApiResponses(value={
    		@ApiResponse(code=200,message="Updated User",response=User.class),
    		@ApiResponse(code=500,message="Internal Server Error", response=InternalError.class),
    		@ApiResponse(code=401,message="Unauthorized", response=Unauthorized.class),
    		@ApiResponse(code=403,message="Forbidden", response=Forbidden.class),
    		@ApiResponse(code=404,message="Note not found", response=ResourceNotFoundException.class)
	})
    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable(value = "id") Integer id, @Valid @RequestBody User userDetails) {

        return userService.update(id, userDetails);
    }
    
    @ApiOperation(value = "Delete User by ID", notes = "Returns 200")
    @ApiResponses(value={
    		@ApiResponse(code=200,message="200 OK"),
    		@ApiResponse(code=500,message="Internal Server Error", response=InternalError.class),
    		@ApiResponse(code=401,message="Unauthorized", response=Unauthorized.class),
    		@ApiResponse(code=403,message="Forbidden", response=Forbidden.class),
    		@ApiResponse(code=404,message="Note not found", response=ResourceNotFoundException.class)
	})
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Integer id) {
        return userService.delete(id);
    }
	
}
