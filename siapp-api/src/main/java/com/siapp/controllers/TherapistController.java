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
import com.siapp.lists.TherapistList;
import com.siapp.models.Therapist;
import com.siapp.services.TherapistService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/therapists", description = "Therapist Module Controller", produces = "application/json")
@RequestMapping("/therapists")
public class TherapistController {
	
	@Autowired
	TherapistService therapistService;

	@ApiOperation(value = "Get all Therapists", notes = "Returns a list of Therapist.class", response = TherapistList.class, responseContainer="List")
    @GetMapping("/getAllTherapists")
    public List<Therapist> getAllTherapists() {
        return therapistService.getAllTherapists();
    }
    
	@ApiOperation(value = "Create new Therapist", notes = "Returns a Therapist.class", response = Therapist.class)
    @PostMapping("/createTherapist")
    public Therapist createTherapist(@Valid @RequestBody Therapist therapist) {
    	return therapistService.create(therapist);
    }
    
    @ApiOperation(value = "Get Therapist by ID", notes = "Returns a Therapist.class", response = Therapist.class)
    @GetMapping("/getTherapist/{id}")
    public Therapist getTherapistById(@PathVariable(value = "id") Integer id) {
        return therapistService.findById(id);
    }
    
    @ApiOperation(value = "Update Therapist by ID", notes = "Returns a Therapist.class", response = Therapist.class)
    @PutMapping("/updateTherapist/{id}")
    public Therapist updateTherapist(@PathVariable(value = "id") Integer id, @Valid @RequestBody Therapist therapistDetails) {
        return therapistService.update(id, therapistDetails);
    }
    
    @ApiOperation(value = "Delete Therapist by ID", notes = "Returns 200")
    @DeleteMapping("/deleteTherapist/{id}")
    public ResponseEntity<?> deleteTherapist(@PathVariable(value = "id") Integer id) {
        return therapistService.delete(id);
    }
	
}
