package com.siapp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.PersonFile;

public interface PersonFileRepository extends JpaRepository<PersonFile, Integer> {

	public List<PersonFile> findByPersonId(Integer personId);
	
}
