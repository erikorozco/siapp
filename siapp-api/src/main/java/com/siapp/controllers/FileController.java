package com.siapp.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;

import com.siapp.services.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/files", description = "File Module Controller")
@RequestMapping("/files")
public class FileController {
	
	@Autowired
	FileService fileService;
	
	List<String> files = new ArrayList<String>();
	
	@PostMapping("/upload")
	  public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
	    String message = "";
	    try {
	    	fileService.store(file);
	    	files.add(file.getOriginalFilename());
	 
	    	message = "You successfully uploaded " + file.getOriginalFilename() + "!";
	    	return ResponseEntity.status(HttpStatus.OK).body(message);
	    } catch (Exception e) {
	    	message = "FAIL to upload " + file.getOriginalFilename() + "!";
	    	return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
	    }
	  }
	
	@ApiOperation(value = "Get all the files attached for a person")
    @GetMapping("/getAllFiles")
	public /*ResponseEntity<List<String>>*/ void getListFiles(Model model) throws MalformedURLException {
		Path rootLocation = Paths.get("storage-dir");
    	Resource resource = new UrlResource(rootLocation.toUri());
    	System.out.println(resource);
		File[] files = new File("/Users/erik/Desktop/erikworkspace/siapp/siapp-api/storage-dir").listFiles();
	    for (File file : files) {
	        if (file.isDirectory()) {
	            System.out.println("Directory: " + file.getName());
	            //showFiles(file.listFiles()); // Calls same method again.
	        } else {
	            System.out.println("File: " + file.getName());
	        }
	    }
	 }
	
	@ApiOperation(value = "Get all the files attached for a person", produces = MediaType.IMAGE_PNG_VALUE)
	@GetMapping("/{filename:.+}")
	@ResponseBody
	public ResponseEntity<byte[]> getFile(@PathVariable String filename) throws IOException {
	    Resource file = fileService.loadFile(filename);
	    byte[] bytes = StreamUtils.copyToByteArray(file.getInputStream());
	    return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION)
                .contentType(MediaType.IMAGE_PNG)
                .body(bytes);
	}
	
}
