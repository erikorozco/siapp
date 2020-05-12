package com.siapp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.Derivation;

public interface DerivationRepository extends JpaRepository<Derivation, Integer>  {

	List<Derivation> findByRecordId(Integer recordId);

}
