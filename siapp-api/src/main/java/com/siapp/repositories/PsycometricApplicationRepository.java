package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.PsycometricApplication;

public interface PsycometricApplicationRepository  extends JpaRepository<PsycometricApplication, Integer> {

	List<PsycometricApplication> findByPersonId(Integer id);
	
}
