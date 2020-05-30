package com.siapp.repositories;

import java.util.List;
import java.util.Optional;
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
			+ "apellidom, "
			+ "persona.id_persona "
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
					+ "apellidom, "
					+ "persona.id_persona "
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
	
	@Query(
			value = "SELECT count(*) "
					+ "FROM expediente_terapeuta et "
					+ "WHERE et.id_expediente = :recordId \n" + 
					"AND et.id_terapeuta = :therapistId ;",
			nativeQuery = true)
	Integer checkIfPermissionExists(@Param("recordId") Integer recordId, @Param("therapistId") Integer therapistId);
	
	
	@Modifying
    @Transactional
	@Query(
			value = "DELETE FROM expediente_terapeuta WHERE  id_expediente = :recordId AND id_terapeuta = :therapistId",
			nativeQuery = true)
	Integer removeRecordPermission(@Param("recordId") Integer recordId, @Param("therapistId") Integer therapistId);
	
	public Optional<Record> findByPersonId(Integer personId);


	@Query(
			value = "SELECT DISTINCT \n" + 
					"	e.id_expediente,\n" + 
					"	e.\"estadoPaciente\",\n" + 
					"	p.nombre,\n" + 
					"   p.apellidop,\n" +
					"	p.apellidom,\n" + 
					"	p.id_persona\n" + 
					"FROM expediente e \n" + 
					"INNER JOIN persona p\n" + 
					"ON e.id_persona = p.id_persona\n" + 
					"WHERE upper(concat_ws(' ',p.nombre, p.apellidop, p.apellidom)) LIKE %:searchText% \n" + 
					"OR e.id_expediente = :recordId \n" + 
					"ORDER BY p.nombre ASC; \n",
			nativeQuery = true)
	List<Object[]> filter(String searchText, Double recordId);
	
}
