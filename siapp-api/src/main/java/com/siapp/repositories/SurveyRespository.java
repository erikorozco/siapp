package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.Survey;

public interface SurveyRespository extends JpaRepository<Survey, Integer>{

	Survey findOneByDerivationId(Integer derivationId);

}
