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
import com.siapp.models.Event;
import com.siapp.services.EventService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@Api(value = "/events", description = "Events Module Controller", produces = "application/json")
@RequestMapping("/events")
public class EventController {
	
	@Autowired
	EventService eventService;
	
	// https://github.com/tkaczmarzyk/specification-arg-resolver
    @GetMapping(value = "/filter")
    public List<Event> filter(  
    		@And({
    			@Spec(path = "notes", params = "notes", spec = LikeIgnoreCase.class),
    			@Spec(path = "startDate", params = {"start", "end"}, spec = Between.class),
    			@Spec(path = "therapist.id", params = "therapistId", spec = Equal.class),
    			@Spec(path = "isBackground", params = "isBackground", spec = Equal.class)
    		}) Specification<Event> spec
    ) {
        return eventService.get(spec);
    }
    
	@GetMapping("/getEvent/{id}")
    public Event get(@PathVariable(value = "id") Integer id) {
        return eventService.find(id);
    }
	
    @ApiOperation(value = "Update Event by ID", notes = "Returns a Event.class", response = Event.class)
    @PutMapping("/update/{id}")
    public Event update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Event eventDetails) {
        return eventService.update(id, eventDetails);
    }
    
    @ApiOperation(value = "Create Event", notes = "Returns a Event.class", response = Event.class)
    @PostMapping("/create")
    public Event create(@Valid @RequestBody Event event) {
        return eventService.create(event);
    }
    
    @ApiOperation(value = "Delete Event by ID", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return eventService.delete(id);
    }

}
