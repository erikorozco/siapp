package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.siapp.models.ServiceType;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Integer>  {

}
