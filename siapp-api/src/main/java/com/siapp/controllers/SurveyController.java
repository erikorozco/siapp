package com.siapp.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siapp.models.Survey;
import com.siapp.services.SurveyService;
import com.siapp.services.SurveyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/surveys", description = "Surveys Module Controller", produces = "application/json")
@RequestMapping("/surveys")
public class SurveyController {
	
	@Autowired
	SurveyService surveyService;
	
    @ApiOperation(value = "Find Survey by  ID", notes = "Survey a Survey.class", response = Survey.class)
    @GetMapping("/getSurvey/{id}")
    public Survey get(@PathVariable(value = "id") Integer id) {
        return surveyService.findById(id);
    }

    @ApiOperation(value = "Find Survey by derivation ID", notes = "Returns a Survey.class", response = Survey.class)
    @GetMapping("/getBySurveyByDerivationId/{derivationId}")
    public Survey getBySurveyByDerivationId(@PathVariable(value = "derivationId") Integer dropId) {
        return surveyService.findByDerivationId(dropId);
    }
    
    @ApiOperation(value = "Create Survey", notes = "Returns a Survey.class", response = Survey.class)
    @PostMapping("/create")
    public Survey create(@Valid @RequestBody Survey surveyDetails) {
        return surveyService.create(surveyDetails);
    }
    
    @ApiOperation(value = "Update Survey by ID", notes = "Returns a Survey.class", response = Survey.class)
    @PutMapping("/update/{id}")
    public Survey update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Survey surveyDetails) {
        return surveyService.update(id, surveyDetails);
    }

}
