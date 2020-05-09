package com.siapp.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Derivation;
import com.siapp.models.Drop;
import com.siapp.repositories.DropRepository;

@Service
public class DropService {
	
	@Autowired
	DropRepository dropRepository;
	
	@Autowired
	DerivationService derivationService;
	
	@Autowired
	CustomUserDetailsService tokenService;
	
	public Drop findByDerivationId(Integer derivationId) {
		return this.dropRepository.findOneByDerivationId(derivationId);
	}
	
	public Drop create(Drop drop) {
		Derivation derivation = derivationService.find(drop.getDerivation().getId());
		derivation.setStatus(drop.getDropType());
		this.derivationService.update(derivation.getId(), derivation);
		//drop.getTherapist().setId(tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return dropRepository.save(drop);
	}
	
	public Drop update(Integer id, Drop dropDetails) {
		Drop drop = dropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Drop", "id", id));
        
        BeanUtils.copyProperties(dropDetails, drop);
        return dropRepository.save(drop);
	}

	public Drop findById(Integer id) {
		Drop drop = dropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Drop", "id", id));
		return drop;
	}

}
