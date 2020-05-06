package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.MedicalRelease;
import com.siapp.repositories.MedicalReleaseRepository;

@Service
public class MedicalReleaseService {
	
	@Autowired
	MedicalReleaseRepository medicalReleaseRepository;
	
	public MedicalRelease findByDerivationId(Integer derivationId) {
		return this.medicalReleaseRepository.findOneByDerivationId(derivationId);
	}
	
	public MedicalRelease create(MedicalRelease derivation) {
		return medicalReleaseRepository.save(derivation);
	}
	
	public MedicalRelease update(Integer id, MedicalRelease medicalReleaseDetails) {
		MedicalRelease medicalRelease = medicalReleaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRelease", "id", id));
        
        BeanUtils.copyProperties(medicalReleaseDetails, medicalRelease);
        return medicalReleaseRepository.save(medicalRelease);
	}

}
