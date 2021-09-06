package com.siapp.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.siapp.models.Person;

// Hard code to any model
public interface ReportRepository extends JpaRepository<Person, Integer> {

	@Query(
			value = "select\n" + 
					"	a.id_aportacion,\n" + 
					"	a.\"fechaTransaccion\",\n" + 
					"	e.id_expediente,\n" + 
					"	concat_ws(' ', p.nombre, p.apellidop, p.apellidom) as nombrePaciente,\n" + 
					"	extract(year\n" + 
					"from\n" + 
					"	age(e.nacimiento)) as edad,\n" + 
					"	e.sexo,\n" + 
					"	e.localidad,\n" + 
					"	e.parroquia,\n" + 
					"	a.tipo_servicio,\n" + 
					"	concat_ws(' ', t.nombret, t.apellidopt, t.apellidomt) as nombreTerapeuta,\n" + 
					"	a.total,\n" + 
					"	a.estado\n" + 
					"from\n" + 
					"	aportacion a\n" + 
					"inner join expediente e on\n" + 
					"	a.id_expediente = e.id_expediente\n" + 
					"inner join persona p on\n" + 
					"	p.id_persona = e.id_persona\n" + 
					"left join terapeuta t on\n" + 
					"	a.id_terapeuta = t.id_terapeuta\n" + 
					"where\n" + 
					"	a.\"fechaTransaccion\" between :startDate and :endDate\n" + 
					"order by\n" + 
					"	a.id_aportacion desc;",
			nativeQuery = true)
	List<Object[]> getAllTickets(Date startDate, Date endDate);

}

