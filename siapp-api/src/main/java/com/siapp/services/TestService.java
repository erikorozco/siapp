package com.siapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.repositories.TestRepository;

@Service
public class TestService {
	
	@Autowired
	TestRepository testRepository;

	public void deleteAll() {
		//testRepository.deleteAllRolesUsers();
		//testRepository.deleteAllUsers();
		//testRepository.deleteAllRoles();
	}


}
