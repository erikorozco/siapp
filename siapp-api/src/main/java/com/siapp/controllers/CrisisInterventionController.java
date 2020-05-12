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
	
	@ApiOperation(value = "Create new crisis intervention")
    @PostMapping("/create")
    public CrisisIntervention createSessionReport(@Valid @RequestBody CrisisIntervention crisisIntervention) {
    	return crisisInterventionService.create(crisisIntervention);
    }
    
    @ApiOperation(value = "Get crisis intervention")
    @GetMapping("/get/{id}")
    public CrisisIntervention get(@PathVariable(value = "id") Integer id) {
        return crisisInterventionService.findById(id);
    }
    
    @ApiOperation(value = "Get crisis intervention all")
    @GetMapping("/getByPersonId/{personId}")
    public List<CrisisIntervention> getByPersonId(@PathVariable(value = "personId") Integer personId) {
        return crisisInterventionService.getByPersonId(personId);
    }
    
    @ApiOperation(value = "Update crisis intervention")
    @PutMapping("/update/{id}")
    public CrisisIntervention update(@PathVariable(value = "id") Integer id, @Valid @RequestBody CrisisIntervention crisisInterventionDetails) {
        return crisisInterventionService.update(id, crisisInterventionDetails);
    }
    
    @ApiOperation(value = "Delete crisis intervention", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return crisisInterventionService.delete(id);
    }

}
