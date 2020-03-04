package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.Log;

public interface LogRepository extends JpaRepository<Log, Integer> {

}
