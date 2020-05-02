package com.siapp.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.models.Derivation;
import com.siapp.services.DerivationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/derivations", description = "Derivations Module Controller", produces = "application/json")
@RequestMapping("/derivations")
public class DerivationController {
	
	@Autowired
	DerivationService derivationService;

    @GetMapping("/getDerivationByRecordId/{recordId}")
    public List<Derivation> getDerivationByRecordId(@PathVariable(value = "recordId") Integer recordId) {
        return derivationService.findDerivationsByRecordId(recordId);
    }
	
    @ApiOperation(value = "Update Derivation by Record ID", notes = "Returns a Derivation.class", response = Derivation.class)
    @PutMapping("/update/{id}")
    public Derivation update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Derivation derivationDetails) {
        return derivationService.update(id, derivationDetails);
    }
    
    @ApiOperation(value = "Create Derivation", notes = "Returns a Derivation.class", response = Derivation.class)
    @PostMapping("/create")
    public Derivation create(@Valid @RequestBody Derivation derivationDetails) {
        return derivationService.create(derivationDetails);
    }
    
    @ApiOperation(value = "Create many derivations", notes = "Returns success", response = Derivation.class)
    @PostMapping("/createDerivations")
    public String createDerivations(@Valid @RequestBody List<Derivation> derivations) {
        return derivationService.createDerivations(derivations);
    }
    
}
