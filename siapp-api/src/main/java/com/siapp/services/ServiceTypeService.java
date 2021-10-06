package com.siapp.services;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.ServiceType;
import com.siapp.repositories.ServiceTypeRepository;

@Service
public class ServiceTypeService {
	
	@Autowired
	ServiceTypeRepository serviceTypeRepository;
	
	public List<ServiceType> getAll() {
		return this.serviceTypeRepository.findAll();
	}
	
	public ServiceType create(ServiceType serviceType) throws ResourceAlreadyExistsException {
		return serviceTypeRepository.save(serviceType);
	}
	
	public ServiceType update(Integer id, ServiceType serviceTypeDetails) {
		ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceType", "id", id));
        
        BeanUtils.copyProperties(serviceTypeDetails, serviceType);
        return serviceTypeRepository.save(serviceType);
	}

	public ServiceType find(Integer id) {
		return this.serviceTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceType", "id", id));
	}
	
	public ResponseEntity<?> delete(Integer id) {
		ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceType", "id", id));
		
		serviceTypeRepository.delete(serviceType);
        return ResponseEntity.ok().build();
	}
}
