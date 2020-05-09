package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.Drop;

public interface DropRepository  extends JpaRepository<Drop, Integer> {
	
	Drop findOneByDerivationId(Integer dropId);

}
