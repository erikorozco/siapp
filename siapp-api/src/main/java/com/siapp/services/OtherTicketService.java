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
import com.siapp.models.OtherTicket;
import com.siapp.repositories.OtherTicketRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class OtherTicketService {
	
	@Autowired
	OtherTicketRepository otherTicketRepository;
	
	public List<OtherTicket> filter(Specification<OtherTicket> spec, Sort sort) {
		return this.otherTicketRepository.findAll(spec, sort);
	}
	
	public OtherTicket create(OtherTicket otherTicket) throws ResourceAlreadyExistsException {
		return otherTicketRepository.save(otherTicket);
	}
	
	public OtherTicket update(Integer id, OtherTicket otherTicketDetails) {
		OtherTicket ticket = otherTicketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Other Ticket", "id", id));
        
		BeanUtils.copyProperties(otherTicketDetails, ticket, IgnoredProperties.getIgnoredProperties(Model.DEFAULT));
        return otherTicketRepository.save(ticket);
	}

	public OtherTicket findById(Integer id) {
		return this.otherTicketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Other Ticket", "id", id));
	}
	
	public ResponseEntity<?> delete(Integer id) {
		OtherTicket otherTicket = otherTicketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Other Ticket", "id", id));
		
		otherTicketRepository.delete(otherTicket);
        return ResponseEntity.ok().build();
	}
}
