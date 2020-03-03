package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.siapp.models.Person;


public interface PersonRepository extends JpaRepository<Person, Integer>  {
	
	@Query(
			value = "SELECT p.*, e.id_expediente \n" + 
					"FROM persona p LEFT JOIN expediente e \n" + 
					"ON p.id_persona = e.id_persona\n" + 
					"ORDER BY p.nombre ASC",
			nativeQuery = true)
	List<Object[]> getAllPersonsQuery();

}
