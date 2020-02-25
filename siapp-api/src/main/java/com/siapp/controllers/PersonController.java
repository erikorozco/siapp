package com.siapp.controllers;

import java.util.HashMap;
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
import com.siapp.lists.PersonList;
import com.siapp.models.Person;
import com.siapp.services.PersonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/persons", description = "Persons Module Controller", produces = "application/json")
@RequestMapping("/persons")
public class PersonController {
	
	@Autowired
	PersonService personService;

    @GetMapping("/getAllPersonQuery")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }
    
    @ApiOperation(value = "Get all Persons", notes = "Returns a list of Person.class", response = PersonList.class, responseContainer="List")
	@GetMapping("/getAllPersons")
	public List<HashMap<String, Object>> getAllPersonsQuery() {
	    return personService.getAllPersonsQuery();
    }
    
	@ApiOperation(value = "Create new Person", notes = "Returns a Person.class", response = Person.class)
    @PostMapping("/createPerson")
    public Person createPerson(@Valid @RequestBody Person person) {
    	return personService.create(person);
    }
    
    @ApiOperation(value = "Get Person by ID", notes = "Returns a Person.class", response = Person.class)
    @GetMapping("/getPerson/{id}")
    public Person getPersonById(@PathVariable(value = "id") Integer id) {
        return personService.findById(id);
    }
    
    @ApiOperation(value = "Update Person by ID", notes = "Returns a Person.class", response = Person.class)
    @PutMapping("/updatePerson/{id}")
    public Person updatePersont(@PathVariable(value = "id") Integer id, @Valid @RequestBody Person personDetails) {
        return personService.update(id, personDetails);
    }
    
    @ApiOperation(value = "Delete Person by ID", notes = "Returns 200")
    @DeleteMapping("/deletePerson/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable(value = "id") Integer id) {
        return personService.delete(id);
    }

}
