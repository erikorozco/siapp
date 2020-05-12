package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Derivation;
import com.siapp.models.MedicalRelease;
import com.siapp.repositories.MedicalReleaseRepository;

@Service
public class MedicalReleaseService {
	
	@Autowired
	MedicalReleaseRepository medicalReleaseRepository;
	
	@Autowired
	CustomUserDetailsService tokenService;
	
	@Autowired
	DerivationService derivationService;
	
	public MedicalRelease findByDerivationId(Integer derivationId) {
		return this.medicalReleaseRepository.findOneByDerivationId(derivationId);
	}
	
	public MedicalRelease create(MedicalRelease medicalRelease) {
		Derivation derivation = derivationService.find(medicalRelease.getDerivation().getId());
		derivation.setStatus("ALTA DEFINITIVA");
		this.derivationService.update(derivation.getId(), derivation);
		medicalRelease.getTherapist().setId(tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return medicalReleaseRepository.save(medicalRelease);
	}
	
	public MedicalRelease update(Integer id, MedicalRelease medicalReleaseDetails) {
		MedicalRelease medicalRelease = medicalReleaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRelease", "id", id));
        
        BeanUtils.copyProperties(medicalReleaseDetails, medicalRelease);
        return medicalReleaseRepository.save(medicalRelease);
	}

	public MedicalRelease findById(Integer id) {
		MedicalRelease medicalRelease = medicalReleaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRelease", "id", id));
		return medicalRelease;
	}

}
