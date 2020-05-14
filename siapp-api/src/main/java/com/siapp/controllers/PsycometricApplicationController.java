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

import com.siapp.models.Psycometric;
import com.siapp.models.PsycometricApplication;
import com.siapp.services.PsycometricApplicationService;
import com.siapp.services.PsycometricService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/psycometricsApplication", description = "Psycometrics Applications Module Controller", produces = "application/json")
@RequestMapping("/psycometricsApplication")
public class PsycometricApplicationController {
	
	@Autowired
	PsycometricApplicationService 	psycometricApplicationService;
	
	@ApiOperation(value = "Create new PsycometricApplication")
    @PostMapping("/create")
    public PsycometricApplication create(@Valid @RequestBody PsycometricApplication psycometric) {
    	return psycometricApplicationService.create(psycometric);
    }
	
    @ApiOperation(value = "Get Psycometric Application by person ID")
    @GetMapping("/getByPersonId/{personId}")
    public List<PsycometricApplication> getByPersonId(@PathVariable(value = "personId") Integer personId) {
        return psycometricApplicationService.findByPersonId(personId);
    }
    
    @ApiOperation(value = "Get PsycometricApplication")
    @GetMapping("/get/{id}")
    public PsycometricApplication get(@PathVariable(value = "id") Integer id) {
        return psycometricApplicationService.findById(id);
    }
 
    
    @ApiOperation(value = "Update PsycometricApplication")
    @PutMapping("/update/{id}")
    public PsycometricApplication update(@PathVariable(value = "id") Integer id, @Valid @RequestBody PsycometricApplication psycometricDetails) {
        return psycometricApplicationService.update(id, psycometricDetails);
    }
    
    @ApiOperation(value = "Delete PsycometricApplication", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return psycometricApplicationService.delete(id);
    }

}
