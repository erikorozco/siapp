package com.siapp.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.File;

public interface FileRepository extends JpaRepository<File, Integer> {

	public List<File> findByPersonId(Integer personId);
	
}
