package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Psycometric;
import com.siapp.repositories.PsycometricRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class PsycometricService {
	
	@Autowired
	PsycometricRepository psycometricRepository;
		
	@Autowired
	CustomUserDetailsService tokenService;
	
	public List<Psycometric> findAll(){
		return psycometricRepository.findAll();
	}
	
	public Psycometric findById(Integer id){
		return psycometricRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));
	}
	
	public Psycometric create(Psycometric psycometric) throws ResourceAlreadyExistsException {
		psycometric.getTherapist().setId(this.tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return psycometricRepository.save(psycometric);
	}
	
	public Psycometric update(Integer id, Psycometric psycometricDetails) {
		Psycometric sessionReport = psycometricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));
        
        BeanUtils.copyProperties(psycometricDetails, sessionReport, IgnoredProperties.getIgnoredProperties(Model.SESSION_REPORT));
        return psycometricRepository.save(sessionReport);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Psycometric psycometric = psycometricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));

		psycometricRepository.delete(psycometric);

        return ResponseEntity.ok().build();
	}

}
