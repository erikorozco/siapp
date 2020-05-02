package com.siapp.services;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Derivation;
import com.siapp.repositories.DerivationRepository;

@Service
public class DerivationService {
	
	@Autowired
	DerivationRepository derivationRepository;
	
	public List<Derivation> findDerivationsByRecordId(Integer recordId) {
		return this.derivationRepository.findByRecordId(recordId);
	}
	
	public Derivation create(Derivation derivation) throws ResourceAlreadyExistsException {
		return derivationRepository.save(derivation);
	}
	
	public Derivation update(Integer id, Derivation derivationDetails) {
		Derivation derivation = derivationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Derivation Resport", "id", id));
        
        BeanUtils.copyProperties(derivationDetails, derivation);
        return derivationRepository.save(derivation);
	}

	public String createDerivations(@Valid List<Derivation> derivations) {
		for (Derivation derivation : derivations) {
			this.derivationRepository.save(derivation);
		}
		return "OK";
	}

}
