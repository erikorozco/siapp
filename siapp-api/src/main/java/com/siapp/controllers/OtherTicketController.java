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
import com.siapp.models.OtherTicket;
import com.siapp.services.OtherTicketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@Api(value = "/otherTickets", description = "Other Tickets Module Controller", produces = "application/json")
@RequestMapping("/otherTickets")
public class OtherTicketController {
	
	@Autowired
	OtherTicketService otherTicketService;
	
	// https://github.com/tkaczmarzyk/specification-arg-resolver
    @ApiOperation(value = "Filter Other Tickets", notes = "Returns a list of OtherTicket.class", response = OtherTicket.class, responseContainer="List")
	@GetMapping("/filter")
	public List<OtherTicket> filter(
			@Join(path= "therapists", alias = "t")
			@And({
    			@Spec(path = "concept", params = "concept", spec = LikeIgnoreCase.class),
    			@Spec(path = "createdAt", params = {"startDate", "endDate"}, spec = Between.class),
    			@Spec(path = "id", params = "id", spec = Equal.class),
    			@Spec(path = "serviceType.id", params = "serviceType", paramSeparator=',', spec = In.class),
    			@Spec(path = "status", params = "status", paramSeparator=',', spec = In.class),
    			@Spec(path = "t.id", params = "therapistId", spec = Equal.class),
    		}) Specification<OtherTicket> spec
	) {
	    return otherTicketService.filter(spec, Sort.by(Sort.Direction.DESC, "id"));
    }
    
	@ApiOperation(value = "Create new Ticket", notes = "Returns a OtherTicket.class", response = OtherTicket.class)
    @PostMapping("/create")
    public OtherTicket create(@Valid @RequestBody OtherTicket otherTicket) {
    	return otherTicketService.create(otherTicket);
    }
    
    @ApiOperation(value = "Get Other Ticket by ID", notes = "Returns a OtherTicket.class", response = OtherTicket.class)
    @GetMapping("/getById/{id}")
    public OtherTicket getById(@PathVariable(value = "id") Integer id) {
        return otherTicketService.findById(id);
    }
    
    @ApiOperation(value = "Update Other Ticket by ID", notes = "Returns a OtherTicket.class", response = OtherTicket.class)
    @PutMapping("/update/{id}")
    public OtherTicket update(@PathVariable(value = "id") Integer id, @Valid @RequestBody OtherTicket otherTicketDetails) {
        return otherTicketService.update(id, otherTicketDetails);
    }
    
    @ApiOperation(value = "Delete Other Ticket by ID", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable(value = "id") Integer id) {
        return otherTicketService.delete(id);
    }

}
