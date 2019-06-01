package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.Therapist;

public interface TherapistRepository  extends JpaRepository<Therapist, Integer> {
}
