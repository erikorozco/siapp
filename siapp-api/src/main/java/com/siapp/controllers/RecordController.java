package com.siapp.controllers;

import java.util.HashMap;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.models.Record;
import com.siapp.models.TherapistRecordPermission;
import com.siapp.models.User;
import com.siapp.services.RecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/records", description = "Record Module Controller", produces = "application/json")
@RequestMapping("/records")
public class RecordController {
	
	@Autowired
	RecordService recordService;
	
	@ApiOperation(value = "Get a record by id", notes = "Record.class", response = Record.class)
    @GetMapping("/findRecordById/{id}")
    public Record findRecordById(@PathVariable(value = "id") Integer id) {
        return recordService.findRecordById(id);
    }
	
	@ApiOperation(value = "Get all the records that belongs to the given therapist")
    @GetMapping("/findRecordsByTherapistId/{id}")
    public List<HashMap<String, Object>> findTherapistRecords(@PathVariable(value = "id") Integer id) {
        return recordService.findRecordsByTherapistId(id);
    }
	
	@ApiOperation(value = "Get all the records")
    @GetMapping("/getAll")
    public List<HashMap<String, Object>> findTherapistRecords() {
        return recordService.getAllRecords();
    }
	
	@ApiOperation(value = "Create new Record", notes = "Returns a Record.class", response = Record.class)
    @PostMapping("/createRecord")
    public Record createRecord(@Valid @RequestBody Record Record) {
			return recordService.create(Record);	
    }
	
    @ApiOperation(value = "Update Record by ID", notes = "Returns a Record.class", response = User.class)
    @PutMapping("/updateRecord/{id}")
    public Record updateRecord(@PathVariable(value = "id") Integer id, @Valid @RequestBody Record recordDetails) {
        return recordService.update(id, recordDetails);
    }
    
	@ApiOperation(value = "Assign a Record to therapists", notes = "Returns OK", response = Record.class)
    @PostMapping("/assignRecord")
    public Integer assignRecord(@Valid @RequestBody TherapistRecordPermission therapistRecordPermission) {
		return recordService.assignRecord(therapistRecordPermission);
    }
	
//	@ApiOperation(value = "Get a record by Therapist id", notes = "Record.class", response = Record.class)
//    @GetMapping("/getRecordByTherapistId/{id}")
//    public Optional<Record> getRecordByTherapistId(@PathVariable(value = "id") Integer id) {
//        return recordService.getRecordByTherapistId(id);
//    }

}
