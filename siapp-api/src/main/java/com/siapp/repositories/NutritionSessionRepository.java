package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.NutritionSession;

public interface NutritionSessionRepository extends JpaRepository<NutritionSession, Integer>{

	public List<NutritionSession> findByRecordIdOrderBySessionNumberDesc(Integer recordId);
	
	public NutritionSession findTopByRecordIdOrderBySessionNumberDesc(Integer recordId);
	
}
