package com.siapp.controllers;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StreamUtils;
import com.siapp.constants.Model;
import com.siapp.services.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/personAttachments", description = "Attachments Module Controller")
@RequestMapping("/personAttachments")
public class PersonAttachmentController {
	
	@Autowired
	FileService fileService;
		
	@ApiOperation(value = "Get all the images attached for a person")
    @GetMapping("/getImagesByPersonId/{personId}")
    public List<HashMap<String, String>> getAllFiles(@PathVariable(value = "personId") Integer personId) {
        return fileService.getPathFilesByPersonIdFromDB(personId);
    }
	
	@ApiOperation(value = "Upload a file for a person")
	@PostMapping("/uploadFile")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, 
			  										@RequestParam("personId") String personId,
			  										@RequestParam("description") String description) {
	    String message = "";
	    try {
	    	fileService.store(file, personId, description, Model.PERSON);	 
	    	message = "You successfully uploaded " + file.getOriginalFilename() + "!";
	    	return ResponseEntity.status(HttpStatus.OK).body(message);
	    } catch (FileAlreadyExistsException e) {
	    	message = "FaiL to upload: " + file.getOriginalFilename() + " Already Exists!";
	    	return ResponseEntity.status(HttpStatus.valueOf(409)).body(message);
	    } catch (Exception e) {
	    	message = "FaiL to upload " + file.getOriginalFilename() + "!";
	    	return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
	    }
	}
	
	@ApiOperation(value = "Get an attached file for a person Id -> png, jpeg, pdf", produces = MediaType.IMAGE_PNG_VALUE)
	@GetMapping("/getFile/{personId}/{filename:.+}")
	@ResponseBody
	public ResponseEntity<byte[]> getFile(@PathVariable String personId, @PathVariable String filename) throws IOException {
		try {
			Resource file = fileService.loadFile(filename, personId, com.siapp.constants.Model.PERSON);
			byte[] bytes = StreamUtils.copyToByteArray(file.getInputStream());
		    return ResponseEntity
	                .ok()
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
	                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION)
	                .contentType(MediaType.IMAGE_PNG)
	                .contentType(MediaType.IMAGE_JPEG)
	                .body(bytes);
		} catch (FileNotFoundException e) {
			byte[] bytesError = null;
			return ResponseEntity.status(HttpStatus.valueOf(404)).body(bytesError);
		}
		
	    
	}
	
}
