package com.siapp.services;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Event;
import com.siapp.repositories.EventRepository;

@Service
public class EventService {
	
	@Autowired
	EventRepository eventRepository;
	
	public List<Event> get(Specification<Event> spec) {
		return this.eventRepository.findAll(spec);
	}
	
	public Event create(Event event) throws ResourceAlreadyExistsException {
		return eventRepository.save(event);
	}
	
	public Event update(Integer id, Event eventDetails) {
		Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        
        BeanUtils.copyProperties(eventDetails, event);
        return eventRepository.save(event);
	}

	public Event find(Integer id) {
		return this.eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
		
		eventRepository.delete(event);
        return ResponseEntity.ok().build();
	}

}
