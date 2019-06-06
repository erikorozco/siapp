package com.siapp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.siapp.models.Record;

public interface RecordRepository extends JpaRepository<Record, Integer>  {
	
	@Query(
	value = "SELECT "
			+ "expediente.id_expediente, "
			+ "expediente.\"estadoPaciente\", "
			+ "nombre, "
			+ "apellidop, "
			+ "apellidom "
			+ "FROM expediente\n" + 
			"INNER JOIN expediente_terapeuta ON expediente_terapeuta.id_expediente = expediente.id_expediente\n" + 
			"INNER JOIN persona ON expediente.id_persona = persona.id_persona\n" + 
			"WHERE expediente_terapeuta.id_terapeuta = :therapistId",
	nativeQuery = true)
	List<Object[]> findRecordsByTherapistId(@Param("therapistId") Integer therapistId );
	
	
	@Query(
			value = "SELECT DISTINCT "
					+ "expediente.id_expediente, "
					+ "expediente.\"estadoPaciente\", "
					+ "nombre, "
					+ "apellidop, "
					+ "apellidom "
					+ "FROM expediente\n" +  
					"INNER JOIN persona ON expediente.id_persona = persona.id_persona\n" + 
					"ORDER BY nombre ASC",
			nativeQuery = true)
	List<Object[]> getAllRecords();
	
	
	@Query(
			value = "INSERT INTO expediente_terapeuta(\n" + 
					"	id_expediente, id_terapeuta)\n" + 
					"    VALUES (:recordId, :therapistId) RETURNING id_expediente_terapeuta;",
			nativeQuery = true)
	Integer assignRecord(@Param("recordId") Integer recordId, @Param("therapistId") Integer therapistId);
	
	
	@Modifying
    @Transactional
	@Query(
			value = "DELETE FROM expediente_terapeuta WHERE  id_expediente = :recordId AND id_terapeuta = :therapistId",
			nativeQuery = true)
	Integer removeRecordPermission(@Param("recordId") Integer recordId, @Param("therapistId") Integer therapistId);
	
//	public Optional<Record> findByTherapistsId(Integer id);
}
