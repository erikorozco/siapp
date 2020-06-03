package com.siapp.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.SatisfactionSurvey;
import com.siapp.repositories.SatisfactionSurveyRepository;

@Service
public class SatisfactionSurveyService {
	
	@Autowired
	SatisfactionSurveyRepository satisfactionSurveyRepository;
	
	public SatisfactionSurvey findByDerivationId(Integer derivationId) {
		return this.satisfactionSurveyRepository.findOneByDerivationId(derivationId);
	}

	public SatisfactionSurvey create(SatisfactionSurvey survey) {
		return satisfactionSurveyRepository.save(survey);
	}
	
	public SatisfactionSurvey update(Integer id, SatisfactionSurvey surveyDetails) {
		SatisfactionSurvey survey = satisfactionSurveyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey", "id", id));
        
        BeanUtils.copyProperties(surveyDetails, survey);
        return satisfactionSurveyRepository.save(survey);
	}

	public SatisfactionSurvey findById(Integer id) {
		SatisfactionSurvey survey = satisfactionSurveyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey", "id", id));
		return survey;
	}

}
