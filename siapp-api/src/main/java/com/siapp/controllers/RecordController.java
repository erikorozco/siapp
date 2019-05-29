package com.siapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.lists.RecordList;
import com.siapp.models.Record;
import com.siapp.services.RecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/records", description = "Record Module Controller", produces = "application/json")
@RequestMapping("/records")
public class RecordController {
	
	@Autowired
	RecordService recordService;
	
	@ApiOperation(value = "Get all records", notes = "Returns a list of Record.class", response = RecordList.class, responseContainer="List")
    @GetMapping("/getAllRecords")
    public Optional<Record> getAllRecords() {
        return recordService.getAllRecords();
    }

}
