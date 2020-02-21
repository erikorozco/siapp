package com.siapp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.SessionReport;

public interface SessionReportRepository extends JpaRepository<SessionReport, Integer>   {
	
	public List<SessionReport> findByrecordIdOrderBySessionNumberDesc(Integer recordId);
	
	public SessionReport findTopByRecordIdOrderBySessionNumberDesc(Integer recordId);
	
}
