package com.siapp.services;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Person;
import com.siapp.repositories.PersonRepository;
import com.siapp.utilities.IgnoredProperties;
import com.siapp.utilities.PersonUtil;
import com.siapp.utilities.RecordUtil;

@Service
public class PersonService {
	
	@Autowired
	PersonRepository personRepository;
	
	/**
	 *  Not used because takes to much time.
	 * @deprecated
	 */
	public List<Person> getAllPersons() {
        return personRepository.findAll(new Sort(Sort.Direction.ASC, "name"));
    }
	
	public Person findById(Integer id){
		return personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person", "id", id));
	}
	
	public Person update(Integer id, Person personDetails) {
		Person person = personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Person", "id", id));
        
        BeanUtils.copyProperties(personDetails, person, IgnoredProperties.getIgnoredProperties(Model.PERSON));
        return personRepository.save(person);
	}
	
	public Person create(Person person) throws ResourceAlreadyExistsException {
		return personRepository.save(person);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Person person = personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Person", "id", id));

//		personRepository.delete(person);
		person.setActive(false);
		this.update(id, person);
		
        return ResponseEntity.ok().build();
	}
	
	/**
	 * Used for get persons on for initial table
	 */
	public  List<HashMap<String, Object>> getAllPersonsQuery(){
		return PersonUtil.convertFindAllPersonsArrayToObject(personRepository.getAllPersonsQuery());
	}

	/**
	 * Filter persons, by any of the following, name, phone, record id
	 */
	public List<HashMap<String, Object>> filterPersons(String searchText, Boolean getActives) {
		return PersonUtil.convertFindAllPersonsArrayToObject(personRepository.filterPersons(searchText.toUpperCase(), RecordUtil.isNumeric(searchText), getActives));
	}

}
