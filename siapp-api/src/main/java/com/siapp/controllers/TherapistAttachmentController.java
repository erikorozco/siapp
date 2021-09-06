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
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.siapp.constants.Model;
import com.siapp.services.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/therapistAttachments", description = "Attachments Module Controller for therapist")
@RequestMapping("/therapistAttachments")
public class TherapistAttachmentController {
	
	@Autowired
	FileService fileService;
		
	@ApiOperation(value = "Get all the images attached for a therapistId")
    @GetMapping("/getImagesByTherpistId/{therapistId}")
    public List<HashMap<String, String>> getAllFiles(@PathVariable(value = "therapistId") Integer therapistId) {
        return fileService.getPathFilesByTherapistIdFromDB(therapistId);
    }
	
	@ApiOperation(value = "Upload a file for a therapist")
	@PostMapping("/uploadFile")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, 
			  										@RequestParam("therapistId") String therapistId,
			  										@RequestParam("description") String description) {
	    String message = "";
	    try {
	    	fileService.store(file, therapistId, description, Model.THERPIST);	 
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
	
	@ApiOperation(value = "Get an attached file for a therapist Id -> png, jpeg, pdf", produces = MediaType.IMAGE_PNG_VALUE)
	@GetMapping("/getFile/{therapistId}/{filename:.+}")
	@ResponseBody
	public ResponseEntity<byte[]> getFile(@PathVariable String therapistId, @PathVariable String filename) throws IOException {
		try {
			Resource file = fileService.loadFile(filename, therapistId, com.siapp.constants.Model.THERPIST);
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
