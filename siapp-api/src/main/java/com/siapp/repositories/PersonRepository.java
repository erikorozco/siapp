package com.siapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.siapp.models.Person;


public interface PersonRepository extends JpaRepository<Person, Integer>  {
	
	@Query(
			value = "SELECT p.*, e.id_expediente \n" + 
					"FROM persona p LEFT JOIN expediente e \n" + 
					"ON p.id_persona = e.id_persona\n" + 
					"ORDER BY p.nombre ASC",
			nativeQuery = true)
	List<Object[]> getAllPersonsQuery();

//	@Query(
//			value = "SELECT\n" + 
//					"	p.*,\n" + 
//					"	e.id_expediente\n" + 
//					"FROM\n" + 
//					"	persona p\n" + 
//					"LEFT JOIN expediente e \n" + 
//					"ON p.id_persona = e.id_persona\n" + 
//					"WHERE\n" + 
//					"	upper(p.nombre) LIKE %:searchText% \n" + 
//					"	OR upper(p.apellidop) LIKE %:searchText%\n" + 
//					"	OR upper(p.apellidom ) LIKE %:searchText%\n" + 
//					"	OR upper(p.telefono) LIKE %:searchText%\n" + 
//					"	OR e.id_expediente = :recordId \n" + 
//					"ORDER BY p.nombre asc;",
//			nativeQuery = true)
	@Query(
			value = "select\n" + 
					"	p.*,\n" + 
					"	e.id_expediente\n" + 
					"from\n" + 
					"	persona p\n" + 
					"left join expediente e \n" + 
					"on p.id_persona = e.id_persona\n" + 
					"where\n" + 
					"	upper(concat_ws(' ',p.nombre, p.apellidop, p.apellidom)) like %:searchText%\n" + 
					" 	or upper(p.telefono) like %:searchText% \n" +
					"	or e.id_expediente = :recordId \n" + 
					"order by p.nombre asc; ",
			nativeQuery = true)
	List<Object[]> filterPersons(String searchText, Double recordId);

}
