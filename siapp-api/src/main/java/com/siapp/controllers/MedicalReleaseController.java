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
import com.siapp.models.MedicalRelease;
import com.siapp.services.MedicalReleaseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/medicalReleases", description = "Medical Releases Module Controller", produces = "application/json")
@RequestMapping("/medicalReleases")
public class MedicalReleaseController {
	
	@Autowired
	MedicalReleaseService medicalReleaseService;
	
    @ApiOperation(value = "Find medicalRelease by  ID", notes = "Returns a MedicalRelease.class", response = MedicalRelease.class)
    @GetMapping("/getMedicalRealease/{id}")
    public MedicalRelease get(@PathVariable(value = "id") Integer id) {
        return medicalReleaseService.findById(id);
    }

    @ApiOperation(value = "Find medicalRelease by derivation ID", notes = "Returns a MedicalRelease.class", response = MedicalRelease.class)
    @GetMapping("/getByMedicalReleaseByDerivationId/{derivationId}")
    public MedicalRelease getByMedicalReleaseByDerivationId(@PathVariable(value = "derivationId") Integer derivationId) {
        return medicalReleaseService.findByDerivationId(derivationId);
    }
    
    @ApiOperation(value = "Create MedicalRelease", notes = "Returns a MedicalRelease.class", response = MedicalRelease.class)
    @PostMapping("/create")
    public MedicalRelease create(@Valid @RequestBody MedicalRelease medicalReleaseDetails) {
        return medicalReleaseService.create(medicalReleaseDetails);
    }
    
    @ApiOperation(value = "Update MedicalRelease by Record ID", notes = "Returns a MedicalRelease.class", response = MedicalRelease.class)
    @PutMapping("/update/{id}")
    public MedicalRelease update(@PathVariable(value = "id") Integer id, @Valid @RequestBody MedicalRelease medicalReleaseDetails) {
        return medicalReleaseService.update(id, medicalReleaseDetails);
    }

}
