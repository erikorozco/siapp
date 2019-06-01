package com.siapp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
	
//	public Optional<Record> findByTherapistsId(Integer id);
}
