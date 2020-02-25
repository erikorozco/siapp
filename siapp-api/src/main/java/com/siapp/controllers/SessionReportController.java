package com.siapp.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.models.SessionReport;
import com.siapp.services.SessionReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/sessions", description = "Sessions Module Controller", produces = "application/json")
@RequestMapping("/sessions")
public class SessionReportController {
	
	@Autowired
	SessionReportService sessionReportService;
	
	@ApiOperation(value = "Get all session reports by record ID")
    @GetMapping("/getSessionsByRecordId/{recordId}")
    public List<SessionReport> getAllPersons(@PathVariable(value = "recordId") Integer recordId) {
		return sessionReportService.getSessionReportsByRecordId(recordId);
    }
	
	@ApiOperation(value = "Create new session report")
    @PostMapping("/createSession")
    public SessionReport createSessionReport(@Valid @RequestBody SessionReport sessionReport) {
    	return sessionReportService.create(sessionReport);
    }
    
    @ApiOperation(value = "Get session report by ID")
    @GetMapping("/getSession/{id}")
    public SessionReport getSessionReportById(@PathVariable(value = "id") Integer id) {
        return sessionReportService.findById(id);
    }
    
    @ApiOperation(value = "Update session report by ID")
    @PutMapping("/updateSession/{id}")
    public SessionReport updateSessionReport(@PathVariable(value = "id") Integer id, @Valid @RequestBody SessionReport sessionReportDetails) {
        return sessionReportService.update(id, sessionReportDetails);
    }
    
    @ApiOperation(value = "Delete session report by ID", notes = "Returns 200")
    @DeleteMapping("/deleteSession/{id}")
    public ResponseEntity<?> deleteSessionReport(@PathVariable(value = "id") Integer id) {
        return sessionReportService.delete(id);
    }

}
