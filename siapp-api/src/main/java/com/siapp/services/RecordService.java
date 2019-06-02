package com.siapp.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Record;
import com.siapp.repositories.RecordRepository;
import com.siapp.utilities.IgnoredProperties;
import com.siapp.utilities.RecordUtil;

@Service
public class RecordService {
	
	@Autowired
	RecordRepository recordRepository;
	
	
	
	public Record findRecordById(Integer id) {
		return recordRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Record", "id", id));
	}
	
	public List<HashMap<String, Object>> findRecordsByTherapistId(Integer id) {
		return RecordUtil.convertFindRecordsByTherapistArrayToObject(recordRepository.findRecordsByTherapistId(id));
	}
	
	public Record create(Record record) {
		//record.setGenogram(null);
		return recordRepository.save(record);
	}
	
	public Record update(Integer id, Record recordDetails) {
		Record record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record", "id", id));  
		
		BeanUtils.copyProperties(recordDetails, record, IgnoredProperties.getIgnoredProperties(Model.RECORD));
		
	    if(recordDetails.getPerson() != null) {
	    	//therapistService.update(user.getTherapist().getId(), userDetails.getTherapist());
	    	//ADD LOIG HERE TO UPDATE ALL THE PROPERTIES
	    }
		
		return recordRepository.save(record);
	}
	
	
	
//	public Optional<Record> getRecordByTherapistIdTest(Integer id) {
//		return recordRepository.findByTherapistsId(id);
//
//	}

}