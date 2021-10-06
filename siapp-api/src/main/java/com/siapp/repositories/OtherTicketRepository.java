package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.siapp.models.OtherTicket;

public interface OtherTicketRepository extends JpaRepository<OtherTicket, Integer>, JpaSpecificationExecutor<OtherTicket> {

}
