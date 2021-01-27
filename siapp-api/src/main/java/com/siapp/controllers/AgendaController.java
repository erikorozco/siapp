package com.siapp.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siapp.models.Agenda;
import com.siapp.services.AgendaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;

@RestController
@Api(value = "/agenda", description = "Agenda Module Controller", produces = "application/json")
@RequestMapping("/agenda")
public class AgendaController {
	
	@Autowired
	AgendaService agendaService;
    
    // https://github.com/tkaczmarzyk/specification-arg-resolver
    @GetMapping(value = "/filter")
    public List<Agenda> filter(  
    		@And({
    			@Spec(path = "notes", params = "notes", spec = Like.class),
    			@Spec(path = "date", params = {"start", "end"}, spec = Between.class),
    			@Spec(path = "therapist.id", params = "therapistId", spec = Equal.class),
    			@Spec(path = "person.id", params = "personId", spec = Equal.class),
    			@Spec(path = "assisted", params = "assisted", spec = Equal.class),
    			@Spec(path = "version", params = "version", spec = Equal.class)
    		}) Specification<Agenda> spec
    ) {
        return agendaService.get(spec);
    }
    
	@GetMapping("/getAppointment/{id}")
    public Agenda get(@PathVariable(value = "id") Integer id) {
        return agendaService.find(id);
    }
    
	
    @ApiOperation(value = "Update Appointment by Record ID", notes = "Returns a Agenda.class", response = Agenda.class)
    @PutMapping("/update/{id}")
    public Agenda update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Agenda agendaDetails) {
        return agendaService.update(id, agendaDetails);
    }
    
    @ApiOperation(value = "Create Agenda", notes = "Returns a Agenda.class", response = Agenda.class)
    @PostMapping("/create")
    public Agenda create(@Valid @RequestBody Agenda agendaDetails) {
        return agendaService.create(agendaDetails);
    }
    
    @ApiOperation(value = "Delete appointmet by ID", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return agendaService.delete(id);
    }
    

}
