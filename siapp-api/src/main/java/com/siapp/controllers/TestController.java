package com.siapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.services.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value = "/apiTestUtil", description = "Api tests util controller", produces = "application/json")
@RequestMapping("/apiTestUtil")
public class TestController {
	
	@Autowired
	TestService testService;
	
    @ApiResponses(value={
    		@ApiResponse(code=200,message="User Details Retrieved"),
    		@ApiResponse(code=409,message="Username already exists")
	})
    @ApiOperation(value = "Delete all the record_therapist rows relation", notes = "Returns 200")
    @PostMapping("/deleteAllRecordTherapist")
    public String deleteRole() {
        testService.deleteAll();
        return "TODO SALIO BIEN";
    }

}
