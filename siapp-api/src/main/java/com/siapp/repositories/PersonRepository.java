package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.Person;


public interface PersonRepository extends JpaRepository<Person, Integer>  {

}
