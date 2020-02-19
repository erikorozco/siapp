package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.siapp.models.Person;


public interface PersonRepository extends JpaRepository<Person, Integer>  {
	
	@Query(
			value = "SELECT * FROM persona ORDER BY nombre ASC",
			nativeQuery = true)
	List<Object[]> getAllPersonsQuery();

}
