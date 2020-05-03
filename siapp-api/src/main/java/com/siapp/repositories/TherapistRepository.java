package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.siapp.models.Therapist;
import com.siapp.models.TherapistRecordPermission;

public interface TherapistRepository  extends JpaRepository<Therapist, Integer> {

	@Query(
			value = "SELECT et.id_expediente FROM expediente_terapeuta et \n" + 
					"WHERE et.id_terapeuta = :therapistId",
			nativeQuery = true)
	List<Integer> getAssignedRecrodsId(@Param("therapistId") Integer therapistId);

	@Query(
			value = "SELECT \n" + 
					"	count(*)\n" + 
					"FROM\n" + 
					"	expediente_terapeuta et\n" + 
					"WHERE\n" + 
					"	et.id_terapeuta = :therapistId\n" + 
					"	and et.id_expediente = :recordId",
			nativeQuery = true)
	Integer getRecordPermission(Integer therapistId, Integer recordId);
	

}
