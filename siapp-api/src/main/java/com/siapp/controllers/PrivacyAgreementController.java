package com.siapp.controllers;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.models.PrivacyAgreement;
import com.siapp.services.PrivacyAgreementService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/privacyAgreement", description = "Privacy Agreement Module Controller", produces = "application/json")
@RequestMapping("/privacyAgreement")
public class PrivacyAgreementController {
	
	@Autowired
	PrivacyAgreementService privacyAgreementService;
	
	@ApiOperation(value = "Create new privacy agreement", notes = "Returns a PrivacyAgreement.class", response = PrivacyAgreement.class)
    @PostMapping("/create")
    public PrivacyAgreement create(@Valid @RequestBody PrivacyAgreement privacyAgreement) {
    	return privacyAgreementService.create(privacyAgreement);
    }
	
	@ApiOperation(value = "Get a privacy agreement by person id", notes = "PrivacyAgreement.class", response = PrivacyAgreement.class)
    @GetMapping("/get/{personId}")
    public PrivacyAgreement getPrivacyAgreement(@PathVariable(value = "personId") Integer personId) {
        return privacyAgreementService.getByPrivacyAgreementPersonId(personId);
	}

}
