package com.siapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.PrivacyAgreement;

public interface PrivacyAgreementRepository extends JpaRepository<PrivacyAgreement, Integer>  {
	
	public Optional<PrivacyAgreement> findByPersonId(Integer personId);

}
