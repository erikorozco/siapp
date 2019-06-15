package com.siapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.PrivacyAgreement;
import com.siapp.repositories.PrivacyAgreementRepository;

@Service
public class PrivacyAgreementService {
	
	@Autowired
	PrivacyAgreementRepository privacyAgreementRepository;
	
	public PrivacyAgreement create(PrivacyAgreement privacyAgreement) {
		return privacyAgreementRepository.save(privacyAgreement);
	}

	public PrivacyAgreement getByPrivacyAgreementPersonId(Integer personId) {
		return privacyAgreementRepository.findByPersonId(personId).orElseThrow(() -> new ResourceNotFoundException("PrivacyAgreement", "id", personId));
	}

}
