package com.siapp.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siapp.models.ServiceType;
import com.siapp.services.ServiceTypeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/services", description = "Service Types Module Controller", produces = "application/json")
@RequestMapping("/services")
public class ServiceTypeController {
	
	@Autowired
	ServiceTypeService serviceTypeService;
    
    @GetMapping(value = "/getAll")
    public List<ServiceType> filter() {
        return serviceTypeService.getAll();
    }
    
	@GetMapping("/getById/{id}")
    public ServiceType get(@PathVariable(value = "id") Integer id) {
        return serviceTypeService.find(id);
    }
    
	
    @ApiOperation(value = "Update Service Type by Record ID", notes = "Returns a ServiceType.class", response = ServiceType.class)
    @PutMapping("/update/{id}")
    public ServiceType update(@PathVariable(value = "id") Integer id, @Valid @RequestBody ServiceType serviceTypeDetails) {
        return serviceTypeService.update(id, serviceTypeDetails);
    }
    
    @ApiOperation(value = "Create ServiceType", notes = "Returns a ServiceType.class", response = ServiceType.class)
    @PostMapping("/create")
    public ServiceType create(@Valid @RequestBody ServiceType serviceTypeDetails) {
        return serviceTypeService.create(serviceTypeDetails);
    }
    
    @ApiOperation(value = "Delete ServiceType by ID", notes = "Returns 200")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id) {
        return serviceTypeService.delete(id);
    }
    

}
