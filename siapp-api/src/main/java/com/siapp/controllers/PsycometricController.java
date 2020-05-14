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
import com.siapp.models.Psycometric;
import com.siapp.models.User;
import com.siapp.services.CrisisInterventionService;
import com.siapp.services.PsycometricService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/psycometricsManagement", description = "Psycometrics Module Controller", produces = "application/json")
@RequestMapping("/psycometricsManagement")
public class PsycometricController {
	
	@Autowired
	PsycometricService 	psycometricService;
	
	@ApiOperation(value = "Create new Psycometric")
    @PostMapping("/create")
    public Psycometric createSessionReport(@Valid @RequestBody Psycometric psycometric) {
    	return psycometricService.create(psycometric);
    }
	
    @ApiOperation(value = "Get all Psycometric")
    @GetMapping("/getAll")
    public List<Psycometric> get() {
        return psycometricService.findAll();
    }
    
    @ApiOperation(value = "Get all active Psycometric")
    @GetMapping("/getAllActive")
    public List<Psycometric> getAllActive() {
        return psycometricService.findAllActive();
    }
    
    @ApiOperation(value = "Get Psycometric")
    @GetMapping("/get/{id}")
    public Psycometric get(@PathVariable(value = "id") Integer id) {
        return psycometricService.findById(id);
    }
 
    
    @ApiOperation(value = "Update Psycometric")
    @PutMapping("/update/{id}")
    public Psycometric update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Psycometric psycometricDetails) {
        return psycometricService.update(id, psycometricDetails);
    }
    
    @ApiOperation(value = "Delete Psycometric", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return psycometricService.delete(id);
    }
    
    @ApiOperation(value = "Update Psycometric by ID", notes = "Returns a Psycometric.class", response = Psycometric.class)
    @PutMapping("/updateStatus/{id}")
    public Psycometric updateStatus(@PathVariable(value = "id") Integer id) {
        return psycometricService.updateStatus(id);
    }

}
