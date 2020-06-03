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
import com.siapp.models.SatisfactionSurvey;
import com.siapp.services.SatisfactionSurveyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/satisfactionSurveys", description = "Satisfaction Surveys Module Controller", produces = "application/json")
@RequestMapping("/satisfactionSurveys")
public class SatisfactionSurveyController {
	
	@Autowired
	SatisfactionSurveyService satisfactionSurveyService;
	
    @ApiOperation(value = "Find Survey by  ID", notes = "Survey a SatisfactionSurvey.class", response = SatisfactionSurvey.class)
    @GetMapping("/get/{id}")
    public SatisfactionSurvey get(@PathVariable(value = "id") Integer id) {
        return satisfactionSurveyService.findById(id);
    }

    @ApiOperation(value = "Find Survey by derivation ID", notes = "Returns a SatisfactionSurvey.class", response = SatisfactionSurvey.class)
    @GetMapping("/getByDerivationId/{derivationId}")
    public SatisfactionSurvey getByDerivationId(@PathVariable(value = "derivationId") Integer derivationId) {
        return satisfactionSurveyService.findByDerivationId(derivationId);
    }
    
    @ApiOperation(value = "Create Survey", notes = "Returns a SatisfactionSurvey.class", response = SatisfactionSurvey.class)
    @PostMapping("/create")
    public SatisfactionSurvey create(@Valid @RequestBody SatisfactionSurvey surveyDetails) {
        return satisfactionSurveyService.create(surveyDetails);
    }
    
    @ApiOperation(value = "Update Survey by ID", notes = "Returns a SatisfactionSurvey.class", response = SatisfactionSurvey.class)
    @PutMapping("/update/{id}")
    public SatisfactionSurvey update(@PathVariable(value = "id") Integer id, @Valid @RequestBody SatisfactionSurvey surveyDetails) {
        return satisfactionSurveyService.update(id, surveyDetails);
    }

}
