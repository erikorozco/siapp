package com.siapp.services;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.SessionReport;
import com.siapp.repositories.SessionReportRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class SessionReportService {
	
	@Autowired
	SessionReportRepository sessionReportRepository;
	
	public List<SessionReport> getSessionReportsByRecordId(Integer recordId) {
        return sessionReportRepository.findByrecordId(recordId);
    }
	
	public SessionReport findById(Integer id){
		return sessionReportRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Session Resport", "id", id));
	}
	
	public SessionReport create(SessionReport sessionReport) throws ResourceAlreadyExistsException {
		return sessionReportRepository.save(sessionReport);
	}
	
	public SessionReport update(Integer id, SessionReport sessionReportDetails) {
		SessionReport sessionReport = sessionReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session Resport", "id", id));
        
        BeanUtils.copyProperties(sessionReportDetails, sessionReport, IgnoredProperties.getIgnoredProperties(Model.SESSION_REPORT));
        return sessionReportRepository.save(sessionReport);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		SessionReport sessionReport = sessionReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session Resport", "id", id));

		sessionReportRepository.delete(sessionReport);

        return ResponseEntity.ok().build();
	}

}
