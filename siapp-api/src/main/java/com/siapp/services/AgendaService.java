package com.siapp.services;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Agenda;
import com.siapp.models.Person;
import com.siapp.repositories.AgendaRepository;

@Service
public class AgendaService {
	
	@Autowired
	AgendaRepository agendaRepository;
	
	@Autowired
	PersonService personService;
	
	public List<Agenda> get(Specification<Agenda> spec) {
		return this.agendaRepository.findAll(spec);
	}
	
	public Agenda create(Agenda agenda) throws ResourceAlreadyExistsException {
		// Set defaults
		agenda.setAssisted(false);
		agenda.setVersion("2");
		
		// If not person is specified, create person
		if (agenda.getPerson().getId() == 0) {
			Person person = personService.create(agenda.getPerson());
			agenda.setPerson(person);
		}
		
		return agendaRepository.save(agenda);
	}
	
	public Agenda update(Integer id, Agenda agendaDetails) {
		Agenda agenda = agendaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agenda", "id", id));
        
        BeanUtils.copyProperties(agendaDetails, agenda);
        return agendaRepository.save(agenda);
	}

	public Agenda find(Integer id) {
		return this.agendaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Agenda", "id", id));
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Agenda agenda = agendaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agenda", "id", id));
		
		agendaRepository.delete(agenda);
        return ResponseEntity.ok().build();
	}
}
