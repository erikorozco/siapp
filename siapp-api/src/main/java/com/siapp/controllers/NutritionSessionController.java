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
import com.siapp.models.NutritionSession;
import com.siapp.services.NutritionSessionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/nutritionSessions", description = "Nutrition Sessions Module Controller", produces = "application/json")
@RequestMapping("/nutritionSessions")
public class NutritionSessionController {
	
	@Autowired
	NutritionSessionService nutritionSessionService;
	
	@ApiOperation(value = "Get all session reports by record ID")
    @GetMapping("/getByRecordId/{recordId}")
    public List<NutritionSession> get(@PathVariable(value = "recordId") Integer recordId) {
		return nutritionSessionService.getNutritionSessionsByRecordId(recordId);
    }
	
	@ApiOperation(value = "Create new nutrition session report")
    @PostMapping("/create")
    public NutritionSession createSessionReport(@Valid @RequestBody NutritionSession nutritionSessionDetails) {
    	return nutritionSessionService.create(nutritionSessionDetails);
    }
    
    @ApiOperation(value = "Get nutrition session report by ID")
    @GetMapping("/get/{id}")
    public NutritionSession getSessionReportById(@PathVariable(value = "id") Integer id) {
        return nutritionSessionService.findById(id);
    }
    
    @ApiOperation(value = "Update nutrition session report by ID")
    @PutMapping("/update/{id}")
    public NutritionSession update(@PathVariable(value = "id") Integer id, @Valid @RequestBody NutritionSession nutritionSessionDetails) {
        return nutritionSessionService.update(id, nutritionSessionDetails);
    }
    
    @ApiOperation(value = "Delete nutrition session report by ID", notes = "Returns 200")
    @DeleteMapping("/deleteSession/{id}")
    public ResponseEntity<?> deleteSessionReport(@PathVariable(value = "id") Integer id) {
        return nutritionSessionService.delete(id);
    }

}
