package com.siapp.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siapp.models.Drop;
import com.siapp.models.Drop;
import com.siapp.services.DropService;
import com.siapp.services.DropService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/drops", description = "Drops(Bajas) Module Controller", produces = "application/json")
@RequestMapping("/drops")
public class DropController {
	
	@Autowired
	DropService dropService;
	
    @ApiOperation(value = "Find Drop by  ID", notes = "Returns a Drop.class", response = Drop.class)
    @GetMapping("/getDrop/{id}")
    public Drop get(@PathVariable(value = "id") Integer id) {
        return dropService.findById(id);
    }

    @ApiOperation(value = "Find Drop by derivation ID", notes = "Returns a Drop.class", response = Drop.class)
    @GetMapping("/getByDropByDerivationId/{derivationId}")
    public Drop getByDropByDerivationId(@PathVariable(value = "derivationId") Integer dropId) {
        return dropService.findByDerivationId(dropId);
    }
    
    @ApiOperation(value = "Create Drop", notes = "Returns a Drop.class", response = Drop.class)
    @PostMapping("/create")
    public Drop create(@Valid @RequestBody Drop DropDetails) {
        return dropService.create(DropDetails);
    }
    
    @ApiOperation(value = "Update Drop by Record ID", notes = "Returns a Drop.class", response = Drop.class)
    @PutMapping("/update/{id}")
    public Drop update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Drop dropDetails) {
        return dropService.update(id, dropDetails);
    }

}
