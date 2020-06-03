package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.SatisfactionSurvey;

public interface SatisfactionSurveyRepository extends JpaRepository<SatisfactionSurvey, Integer> {
	
	SatisfactionSurvey findOneByDerivationId(Integer derivationId);

}
