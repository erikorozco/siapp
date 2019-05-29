package com.siapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.models.Record;
import com.siapp.repositories.RecordRepository;

@Service
public class RecordService {
	
	@Autowired
	RecordRepository recordRepository;
	
	public Optional<Record> getAllRecords() {
		return recordRepository.findById(1020);
	}

}
