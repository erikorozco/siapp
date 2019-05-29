package com.siapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.Record;


public interface RecordRepository extends JpaRepository<Record, Integer>  {
	
	Optional<Record> findById(Integer recordId);
	
}
