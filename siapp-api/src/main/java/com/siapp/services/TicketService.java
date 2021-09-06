package com.siapp.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Ticket;
import com.siapp.repositories.TicketRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class TicketService {
	
	@Autowired
	TicketRepository ticketRepository;
	
	public List<Ticket> filter(Specification<Ticket> spec, Sort sort) {
		return this.ticketRepository.findAll(spec, sort);
	}
	
	public Ticket create(Ticket ticket) throws ResourceAlreadyExistsException {
		return ticketRepository.save(ticket);
	}
	
	public Ticket update(Integer id, Ticket eventDetails) {
		Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
        
		BeanUtils.copyProperties(eventDetails, ticket, IgnoredProperties.getIgnoredProperties(Model.DEFAULT));
        return ticketRepository.save(ticket);
	}

	public Ticket findById(Integer id) {
		return this.ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
		
		ticketRepository.delete(ticket);
        return ResponseEntity.ok().build();
	}
}
