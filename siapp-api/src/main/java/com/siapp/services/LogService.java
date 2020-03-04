package com.siapp.services;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.models.Log;
import com.siapp.repositories.LogRepository;

@Service
public class LogService {

	@Autowired
	LogRepository logRepository;
	
	public void createLogFromRequest(HttpServletRequest request) {
		Log log = new Log(request.getRemoteUser(), request.getRequestURI(), request.getMethod());
		logRepository.save(log);
	}
	
}
