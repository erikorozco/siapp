package com.siapp.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
import com.siapp.models.Ticket;
import com.siapp.services.TicketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@Api(value = "/tickets", description = "Tickets Module Controller", produces = "application/json")
@RequestMapping("/tickets")
public class TicketController {
	
	@Autowired
	TicketService ticketService;
	
	// https://github.com/tkaczmarzyk/specification-arg-resolver
    @ApiOperation(value = "Filter Tickets", notes = "Returns a list of Ticket.class", response = Ticket.class, responseContainer="List")
	@GetMapping("/filter")
	public List<Ticket> filter(
			@And({
    			@Spec(path = "concept", params = "concept", spec = LikeIgnoreCase.class),
    			@Spec(path = "createdAt", params = {"startDate", "endDate"}, spec = Between.class),
    			@Spec(path = "therapist.id", params = "therapistId", spec = Equal.class),
    			@Spec(path = "record.id", params = "recordId", spec = Equal.class),
    			@Spec(path = "id", params = "id", spec = Equal.class),
    			@Spec(path = "serviceType", params = "serviceType", paramSeparator=',', spec = In.class),
    			@Spec(path = "status", params = "status", paramSeparator=',', spec = In.class),
    		}) Specification<Ticket> spec
	) {
	    return ticketService.filter(spec, Sort.by(Sort.Direction.DESC, "id"));
    }
    
	@ApiOperation(value = "Create new Ticket", notes = "Returns a Ticket.class", response = Ticket.class)
    @PostMapping("/create")
    public Ticket createTicket(@Valid @RequestBody Ticket ticket) {
    	return ticketService.create(ticket);
    }
    
    @ApiOperation(value = "Get Ticket by ID", notes = "Returns a Ticket.class", response = Ticket.class)
    @GetMapping("/getTicket/{id}")
    public Ticket getTicketById(@PathVariable(value = "id") Integer id) {
        return ticketService.findById(id);
    }
    
    @ApiOperation(value = "Update Ticket by ID", notes = "Returns a Ticket.class", response = Ticket.class)
    @PutMapping("/update/{id}")
    public Ticket updateTicket(@PathVariable(value = "id") Integer id, @Valid @RequestBody Ticket ticketDetails) {
        return ticketService.update(id, ticketDetails);
    }
    
    @ApiOperation(value = "Delete Ticket by ID", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable(value = "id") Integer id) {
        return ticketService.delete(id);
    }

}
