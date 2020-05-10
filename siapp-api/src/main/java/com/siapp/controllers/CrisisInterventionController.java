package com.siapp.controllers;

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

import com.siapp.models.CrisisIntervention;
import com.siapp.services.CrisisInterventionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/crisisInterventions", description = "Crisis Interventions Module Controller", produces = "application/json")
@RequestMapping("/crisisInterventions")
public class CrisisInterventionController {
	
	@Autowired
	CrisisInterventionService crisisInterventionService;
	
	@ApiOperation(value = "Create new crisis intervention report")
    @PostMapping("/create")
    public CrisisIntervention createSessionReport(@Valid @RequestBody CrisisIntervention crisisIntervention) {
    	return crisisInterventionService.create(crisisIntervention);
    }
    
    @ApiOperation(value = "Get crisis intervention report by ID")
    @GetMapping("/get/{id}")
    public CrisisIntervention get(@PathVariable(value = "id") Integer id) {
        return crisisInterventionService.findById(id);
    }
    
    @ApiOperation(value = "Update crisis intervention report by ID")
    @PutMapping("/update/{id}")
    public CrisisIntervention update(@PathVariable(value = "id") Integer id, @Valid @RequestBody CrisisIntervention crisisInterventionDetails) {
        return crisisInterventionService.update(id, crisisInterventionDetails);
    }
    
    @ApiOperation(value = "Delete crisis intervention report by ID", notes = "Returns 200")
    @DeleteMapping("/deleteSession/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return crisisInterventionService.delete(id);
    }

}
