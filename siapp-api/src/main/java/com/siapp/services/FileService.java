package com.siapp.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Stream;

@Service
public class FileService {
	
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	private final Path rootLocation = Paths.get("storage-dir");
	
	public void init() {
		try {
			if(Files.notExists(rootLocation)) {
				Files.createDirectory(rootLocation);	
			}
		} catch (Exception e) {
			throw new RuntimeException("Could not initialize storage!");
		}
	}
	
	public void store(MultipartFile file) {
	    try {
	      Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
	    } catch (Exception e) {
	      throw new RuntimeException("FAIL!");
	    }
	}
	
	public Resource loadFile(String filename) throws IOException {
	    try {
	    	Path file = rootLocation.resolve(filename);
	    	Resource resource = new UrlResource(file.toUri());
	    	if (resource.exists() || resource.isReadable()) {
	    		return resource;
	    	} else {
	    		throw new RuntimeException("FAIL!");
	    	}
	    	} catch (MalformedURLException e) {
	    		throw new RuntimeException("FAIL!");
	    	}
	  }
	
	public void deleteAll() {
	    FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
	
}
