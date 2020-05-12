package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.CrisisIntervention;
import com.siapp.repositories.CrisisInterventionRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class CrisisInterventionService {

	@Autowired
	CrisisInterventionRepository crisisInterventionRepository;
		
	@Autowired
	CustomUserDetailsService tokenService;
	
	public CrisisIntervention findById(Integer id){
		return crisisInterventionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nutrition Crisis Intervention", "id", id));
	}
	
	public CrisisIntervention create(CrisisIntervention crisisIntervention) throws ResourceAlreadyExistsException {
		crisisIntervention.getTherapist().setId(this.tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return crisisInterventionRepository.save(crisisIntervention);
	}
	
	public CrisisIntervention update(Integer id, CrisisIntervention crisisInterventionDetails) {
		CrisisIntervention sessionReport = crisisInterventionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crisis Intervention", "id", id));
        
        BeanUtils.copyProperties(crisisInterventionDetails, sessionReport, IgnoredProperties.getIgnoredProperties(Model.SESSION_REPORT));
        return crisisInterventionRepository.save(sessionReport);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		CrisisIntervention sessionReport = crisisInterventionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crisis Intervention", "id", id));

		crisisInterventionRepository.delete(sessionReport);

        return ResponseEntity.ok().build();
	}

	public List<CrisisIntervention> getByPersonId(Integer personId) {
		return crisisInterventionRepository.findByPersonId(personId);
	}
	
}
