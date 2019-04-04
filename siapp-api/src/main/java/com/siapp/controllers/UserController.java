package com.siapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;

import com.siapp.exceptions.ResourceNotFound;
import com.siapp.lists.UserList;
import com.siapp.models.User;
import com.siapp.repositories.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value = "/user", description = "Users Module Controller", produces = "application/json")
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
    @ApiOperation(value = "Get all users", notes = "Returns a list of Users.class", response = UserList.class, responseContainer="List")
//    @ApiResponses(value={
//    		@ApiResponse(code=200,message="Note Details Retrieved",response=User.class),
//    		@ApiResponse(code=500,message="Internal Server Error", response=InternalError.class),
//    		@ApiResponse(code=401,message="Unauthorized", response=Unauthorized.class),
//    		@ApiResponse(code=403,message="Forbidden", response=Forbidden.class),
//    		@ApiResponse(code=404,message="Note not found", response=ResourceNotFound.class)
//	})
    @GetMapping("/getAllUsers")
    public List<User> getAllNotes() {
        return userRepository.findAll();
    }
	
}
