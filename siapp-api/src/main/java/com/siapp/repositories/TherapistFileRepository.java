package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.TherapistFile;

public interface TherapistFileRepository extends JpaRepository<TherapistFile, Integer> {

	public List<TherapistFile> findByTherapistId(Integer therapistId);
	
}
