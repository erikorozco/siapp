package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.CrisisIntervention;
import com.siapp.models.SessionReport;

public interface CrisisInterventionRepository extends JpaRepository<CrisisIntervention, Integer>{

	public List<CrisisIntervention> findByPersonId(Integer personId);
	
}
