package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.PsycometricApplication;
import com.siapp.repositories.PsycometricApplicationRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class PsycometricApplicationService {
	
	@Autowired
	PsycometricApplicationRepository psycometricApplicationRepository;
		
	@Autowired
	CustomUserDetailsService tokenService;
	
	public List<PsycometricApplication> findByPersonId(Integer id) {
		return psycometricApplicationRepository.findByPersonId(id);
	}
	
	public PsycometricApplication findById(Integer id){
		return psycometricApplicationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PsycometricApplication", "id", id));
	}
	
	public PsycometricApplication create(PsycometricApplication psycometricApplication) throws ResourceAlreadyExistsException {
		psycometricApplication.getTherapist().setId(this.tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return psycometricApplicationRepository.save(psycometricApplication);
	}
	
	public PsycometricApplication update(Integer id, PsycometricApplication psycometricApplicationDetails) {
		PsycometricApplication sessionReport = psycometricApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PsycometricApplication", "id", id));
        
        BeanUtils.copyProperties(psycometricApplicationDetails, sessionReport, IgnoredProperties.getIgnoredProperties(Model.SESSION_REPORT));
        return psycometricApplicationRepository.save(sessionReport);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		PsycometricApplication psycometricApplication = psycometricApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PsycometricApplication", "id", id));

		psycometricApplicationRepository.delete(psycometricApplication);

        return ResponseEntity.ok().build();
	}

}
