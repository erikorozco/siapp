package com.siapp.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Derivation;
import com.siapp.models.Drop;
import com.siapp.models.Survey;
import com.siapp.repositories.SurveyRespository;

@Service
public class SurveyService {
	
	@Autowired
	SurveyRespository surveyRespository;
	
	public Survey findByDerivationId(Integer derivationId) {
		return this.surveyRespository.findOneByDerivationId(derivationId);
	}

	public Survey create(Survey survey) {
		return surveyRespository.save(survey);
	}
	
	public Survey update(Integer id, Survey surveyDetails) {
		Survey survey = surveyRespository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey", "id", id));
        
        BeanUtils.copyProperties(surveyDetails, survey);
        return surveyRespository.save(survey);
	}

	public Survey findById(Integer id) {
		Survey survey = surveyRespository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey", "id", id));
		return survey;
	}
	
}
