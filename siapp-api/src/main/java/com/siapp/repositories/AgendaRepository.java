package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.siapp.models.Agenda;

public interface AgendaRepository extends JpaRepository<Agenda, Integer>, JpaSpecificationExecutor<Agenda>  {

}
