package com.siapp.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Person;
import com.siapp.models.Record;
import com.siapp.models.TherapistRecordPermission;
import com.siapp.repositories.RecordRepository;
import com.siapp.utilities.FileUtil;
import com.siapp.utilities.IgnoredProperties;
import com.siapp.utilities.RecordUtil;


@Service
public class RecordService {
	
	@Autowired
	RecordRepository recordRepository;
	
	@Autowired
	PersonService personService;
	
	public Record findRecordById(Integer id) {
		return recordRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Record", "id", id));		
	}
	
	public List<HashMap<String, Object>> findRecordsByTherapistId(Integer id) {
		return RecordUtil.convertFindRecordsByTherapistArrayToObject(recordRepository.findRecordsByTherapistId(id));
	}
	
	public Record findRecordByPersonId(Integer personId) {
		return recordRepository.findByPersonId(personId).orElse(null);
		//return recordRepository.findByPersonId(personId).orElseThrow(() -> new ResourceNotFoundException("Record", "person id", personId));
	}
	
	public List<HashMap<String, Object>> getAllRecords() {
		return RecordUtil.convertFindRecordsByTherapistArrayToObject(recordRepository.getAllRecords());
	} 
	
	public Record create(Record record) {
		
		Record existingRecord = recordRepository.findByPersonId(record.getPerson().getId()).orElse(null);
		
		if (existingRecord != null) {
			throw new ResourceAlreadyExistsException("Record", "id", record.getId());
		}
		
		this.personService.update(record.getPerson().getId(), record.getPerson());
		return recordRepository.save(record);
	}
	
	public Record update(Integer id, Record recordDetails) {
		
		Record record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record", "id", id));  
		
		BeanUtils.copyProperties(recordDetails, record, IgnoredProperties.getIgnoredProperties(Model.RECORD));
		
	    if(recordDetails.getPerson() != null) {
	    	this.personService.update(recordDetails.getPerson().getId(), recordDetails.getPerson());
	    }
		
		return recordRepository.save(record);
	}
	
	public Integer assignRecord(TherapistRecordPermission therapistRecordPermission) {
		
		if(recordRepository.checkIfPermissionExists(therapistRecordPermission.getRecordId(), therapistRecordPermission.getTherapistId()) > 0) {
			throw new ResourceAlreadyExistsException("Record permission", "record ID and therapist ID", therapistRecordPermission.getRecordId()+therapistRecordPermission.getTherapistId());
		}
		
		return recordRepository.assignRecord(therapistRecordPermission.getRecordId(), therapistRecordPermission.getTherapistId());
	}
	
	public Integer removeRecordPermission(TherapistRecordPermission therapistRecordPermission) {
		return recordRepository.removeRecordPermission(therapistRecordPermission.getRecordId(), therapistRecordPermission.getTherapistId());
	}
	
	public void uploadGenogram(MultipartFile genogram, Integer recordId) {
		try {
			Record record = recordRepository.findById(recordId)
	                .orElseThrow(() -> new ResourceNotFoundException("Record", "id", recordId));
			
			record.setGenogram(FileUtil.convertFileToBinaryStream(genogram));
			recordRepository.save(record);
			
		} catch (IOException e) {
			throw new RuntimeException("FAIL!");
		}
		
	}

	public List<HashMap<String, Object>> filter(String searchText) {
		return RecordUtil.convertFindRecordsByTherapistArrayToObject(recordRepository.filter(searchText.toUpperCase(), RecordUtil.isNumeric(searchText)));
	}
	
	
//	public Optional<Record> getRecordByTherapistIdTest(Integer id) {
//		return recordRepository.findByTherapistsId(id);
//
//	}

}
