package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.NutritionSession;
import com.siapp.repositories.NutritionSessionRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class NutritionSessionService {
	
	@Autowired
	NutritionSessionRepository nutritionSessionRepository;
		
	@Autowired
	CustomUserDetailsService tokenService;
	
	public List<NutritionSession> getNutritionSessionsByRecordId(Integer recordId) {
        return nutritionSessionRepository.findByRecordIdOrderBySessionNumberDesc(recordId);
    }
	
	public NutritionSession findById(Integer id){
		return nutritionSessionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nutrition Session Resport", "id", id));
	}
	
	public NutritionSession create(NutritionSession sessionReport) throws ResourceAlreadyExistsException {
		sessionReport.setSessionNumber(this.findLastSessionNumber(sessionReport.getRecordId()) + 1);
		sessionReport.getTherapist().setId(this.tokenService.getUserTokenDetails().getAppUser().getTherapist().getId());
		return nutritionSessionRepository.save(sessionReport);
	}
	
	public NutritionSession update(Integer id, NutritionSession sessionReportDetails) {
		NutritionSession sessionReport = nutritionSessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session Resport", "id", id));
        
        BeanUtils.copyProperties(sessionReportDetails, sessionReport, IgnoredProperties.getIgnoredProperties(Model.SESSION_REPORT));
        return nutritionSessionRepository.save(sessionReport);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		NutritionSession sessionReport = nutritionSessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session Resport", "id", id));

		nutritionSessionRepository.delete(sessionReport);

        return ResponseEntity.ok().build();
	}
	
	public Integer findLastSessionNumber(Integer recordId) {
		NutritionSession lastSession = nutritionSessionRepository.findTopByRecordIdOrderBySessionNumberDesc(recordId);
		return (lastSession == null)? 0 : lastSession.getSessionNumber();
	}

}
