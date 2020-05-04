package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.MedicalRelease;

public interface MedicalReleaseRepository extends JpaRepository<MedicalRelease, Integer> {

	List<MedicalRelease> findByDerivationId(Integer derivationId);

}
