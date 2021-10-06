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
					"	e.municipio,\n" + 
					"	e.parroquia,\n" + 
					"	s.valor,\n" + 
					"	concat_ws(' ', t.nombret, t.apellidopt, t.apellidomt) as nombreTerapeuta,\n" + 
					"	a.total,\n" + 
					"	a.estado\n" + 
					"from\n" + 
					"	aportacion a\n" + 
					"inner join expediente e on\n" + 
					"	a.id_expediente = e.id_expediente\n" + 
					"inner join persona p on\n" + 
					"	p.id_persona = e.id_persona\n" + 
					"inner join servicio s on\n" + 
					"	s.id_servicio = a.id_servicio\n" + 
					"left join terapeuta t on\n" + 
					"	a.id_terapeuta = t.id_terapeuta\n" + 
					"where\n" + 
					"	a.\"fechaTransaccion\" between :startDate and :endDate\n" + 
					"order by\n" + 
					"	a.id_aportacion desc;",
			nativeQuery = true)
	List<Object[]> getAllTickets(Date startDate, Date endDate);
	
	@Query(
			value = "select\n" + 
					"	oa.id_otra_aportacion,\n" + 
					"	oa.creado,\n" + 
					"	concat_ws(' ', oa.nombre, oa.apellidoMaterno, oa.apellidoMaterno) as nombrePaciente,\n" + 
					"	extract(year\n" + 
					"from\n" + 
					"	age(oa.\"fecha_nacimiento\")) as edad,\n" + 
					"	oa.sexo,\n" + 
					"	oa.localidad,\n" + 
					"	oa.municipio,\n" + 
					"	oa.parroquia,\n" + 
					"	s.valor,\n" + 
					"	oa.total,\n" + 
					"	oa.estado\n" + 
					"from\n" + 
					"	otra_aportacion oa\n" + 
					"inner join servicio s on\n" + 
					"	s.id_servicio = oa.id_servicio \n" + 
					"where\n" + 
					"	oa.creado between :startDate and :endDate\n" + 
					"order by\n" + 
					"	oa.id_otra_aportacion desc;",
			nativeQuery = true)
	List<Object[]> getAllOtherTickets(Date startDate, Date endDate);
	
	@Query(
			value = "select concat_ws(' ', t.nombret, t.apellidopt, t.apellidomt) as nombreTerapeuta\n" + 
					"from otra_aportacion_terapeuta oat \n" + 
					"inner join terapeuta t on oat.id_terapeuta = t.id_terapeuta \n" + 
					"where oat.id_otra_aportacion = :otherTicketId",
			nativeQuery = true)
	List<Object[]> getTherapistsByOtherItcketId(Integer otherTicketId);

}

