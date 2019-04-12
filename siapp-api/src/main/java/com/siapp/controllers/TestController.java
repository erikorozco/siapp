package com.siapp.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siapp.models.Test;
import com.siapp.repositories.TestRepository;

import io.swagger.annotations.Api;

@RestController
@Api(value = "/test", description = "Test Module Controller", produces = "application/json")
@RequestMapping("/tests")
public class TestController {
	
	@Autowired
	TestRepository testRepository;
	
	@PostMapping("/create")
    public Test createTest(@Valid @RequestBody Test test) {
        return testRepository.save(test);
    }

}
