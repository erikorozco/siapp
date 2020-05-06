package com.siapp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.siapp.models.Therapist;

public interface PermissionRepository extends JpaRepository<Therapist, Integer> {

	@Query(
			value = "select et.id_expediente from expediente_terapeuta et \n" + 
					"where et.id_terapeuta = :therapistId",
			nativeQuery = true)
	List<Integer> getAssignedRecrodsId(@Param("therapistId") Integer therapistId);

	@Query(
			value = "select \n" + 
					"	count(*)\n" + 
					"from\n" + 
					"	expediente_terapeuta et\n" + 
					"where\n" + 
					"	et.id_terapeuta = :therapistId\n" + 
					"	and et.id_expediente = :id",
			nativeQuery = true)
	Integer getRecordPermission(Integer therapistId, Integer id);
	
	
	@Query(
			value = "select\n" + 
					"	count(*)\n" + 
					"from\n" + 
					"	sesion s\n" + 
					"where\n" + 
					"	s.id_terapeuta = :therapistId\n" + 
					"	and s.id_sesion  = :id",
			nativeQuery = true)
	Integer getSessionPermission(Integer therapistId, Integer id);
	
	
	@Query(
			value = "select\n" + 
					"	count(*)\n" + 
					"from\n" + 
					"	derivacion d\n" + 
					"where\n" + 
					"	d.id_terapeuta = :therapistId\n" + 
					"	and d.id = :id",
			nativeQuery = true)
	Integer getDerivationPermission(Integer therapistId, Integer id);
	
}
