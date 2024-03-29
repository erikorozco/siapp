package com.siapp.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import com.siapp.constants.Model;
import com.siapp.models.PersonFile;
import com.siapp.models.TherapistFile;
import com.siapp.repositories.PersonFileRepository;
import com.siapp.repositories.TherapistFileRepository;
import com.siapp.utilities.FileUtil;
import java.util.HashMap;
import java.util.List;

@Service
public class FileService {
	
	private final Path rootLocation = Paths.get("storage-dir");
	private final Path therapistFilesLocation = Paths.get("storage-dir/therapist-dir");
	private final Path personFilesLocation = Paths.get("storage-dir/person-dir");
	
	@Autowired
	PersonFileRepository personFileRepository;
	
	@Autowired
	TherapistFileRepository therapistFileRepository;
	
	@Autowired
	TherapistService fileService;
	
	@Autowired
	CustomUserDetailsService tokenService;
	
	public List<HashMap<String, String>>  getPathFilesByPersonIdFromDB(Integer personId) {
		List<PersonFile> fileList = personFileRepository.findByPersonId(personId);
		return FileUtil.getPersonFilesOnBase64(fileList, folderInitialize(String.valueOf(personId), Model.PERSON).toString());
    }
	
	public List<HashMap<String, String>>  getPathFilesByTherapistIdFromDB(Integer therapistId) {
		List<TherapistFile> fileList = therapistFileRepository.findByTherapistId(therapistId);
		return FileUtil.getTherapistFilesOnBase64(fileList, folderInitialize(String.valueOf(therapistId), Model.THERPIST).toString());
    }
	
	public void init() {
		try {
			if(Files.notExists(rootLocation)) {
				Files.createDirectory(rootLocation);
				Files.createDirectory(therapistFilesLocation);
				Files.createDirectory(personFilesLocation);
			}
		} catch (Exception e) {
			throw new RuntimeException("Could not initialize storage!");
		}
	}
	
	public void store(MultipartFile file, String modelId, String description, Model model) throws IOException {
	    try {
	    	Path folderPath = this.folderInitialize(modelId, model);
	    	Path filePath = Paths.get(folderPath.toString().concat("/" + file.getOriginalFilename()));
	    	if(Files.notExists(filePath)) {
		    	Files.copy(file.getInputStream(), folderPath.resolve(file.getOriginalFilename()));
		    	
		    	if (model.equals(Model.PERSON)) {
				    PersonFile fileRow = new PersonFile(
					    		file.getOriginalFilename(), 
					    		description, 
					    		Integer.parseInt(modelId), 
					    		this.tokenService.getUserTokenDetails().getAppUser().getTherapist().getId()
				    		);
				    personFileRepository.save(fileRow);
		    	} else {
		    		TherapistFile fileRow = new TherapistFile(
			    				file.getOriginalFilename(),
			    				description,
			    				Integer.parseInt(modelId)
		    				);
		    		therapistFileRepository.save(fileRow);
		    	}
		    	
	    	} else if(file.getOriginalFilename().equals("profilePhoto.png")) {
	    		Files.copy(file.getInputStream(), folderPath.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
	    	}
	    	else {
	    		throw new FileAlreadyExistsException("FAIL!");
	    	}
	    } catch (RuntimeException e) {
	    	throw new RuntimeException("FAIL!");
	    }
	}
	
	public Resource loadFile(String filename, String modelId, Model model) throws IOException {
	    try {
	    	Path folderPath = this.folderInitialize(modelId, model);
	    	Path file = folderPath.resolve(filename);
	    	Resource resource = new UrlResource(file.toUri());
	    	if (resource.exists() || resource.isReadable()) {
	    		return resource;
	    	} else {
	    		throw new FileNotFoundException();
	    	}
	    } catch (MalformedURLException e) {
	    		throw new RuntimeException("FAIL!");
	    }
	}
	
	public void deleteAll() {
	    FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
	
	public Path folderInitialize(String modelId, Model model) {
		StringBuilder pathFolder = (model.equals(Model.PERSON)) ? new StringBuilder(personFilesLocation.toString()) : new StringBuilder(therapistFilesLocation.toString());
		pathFolder.append("/");
		pathFolder.append(modelId);
		Path folderPathId = Paths.get(pathFolder.toString());
		try {
			if(Files.notExists(folderPathId)) {
				Files.createDirectory(folderPathId);
			}		
		} catch (Exception e) {
			throw new RuntimeException("Folder does not exitst!");
		}
		return folderPathId;
	}
	
}
