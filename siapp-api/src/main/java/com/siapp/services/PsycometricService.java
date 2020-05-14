package com.siapp.services;

import java.util.ArrayList;
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
	
	public List<Psycometric> findAllActive(){
		return this.filterActive(psycometricRepository.findAll());
	}
	
	public Psycometric findById(Integer id){
		return psycometricRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));
	}
	
	public Psycometric create(Psycometric psycometric) throws ResourceAlreadyExistsException {
		psycometric.getTherapist().setId(this.tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return psycometricRepository.save(psycometric);
	}
	
	public Psycometric update(Integer id, Psycometric psycometricDetails) {
		Psycometric psycometric = psycometricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));
        
        BeanUtils.copyProperties(psycometricDetails, psycometric, IgnoredProperties.getIgnoredProperties(Model.SESSION_REPORT));
        return psycometricRepository.save(psycometric);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Psycometric psycometric = psycometricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));

		psycometricRepository.delete(psycometric);

        return ResponseEntity.ok().build();
	}

	public Psycometric updateStatus(Integer id) {
		Psycometric psycometric = psycometricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Psycometric", "id", id));
		psycometric.setActive(!psycometric.isActive());
		
		return psycometricRepository.save(psycometric);
	}
	
	private List<Psycometric> filterActive(List<Psycometric> psycometricList) {
		List<Psycometric> result = new ArrayList<Psycometric>();
		
		for (Psycometric psycometric : psycometricList) {
			if (psycometric.isActive()) {
				result.add(psycometric);
			}
		}
		return result;
	}

}
