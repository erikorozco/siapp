package com.siapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.User;
import com.siapp.repositories.UserRepository;
import com.siapp.utilities.IgnoredProperties;


@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TherapistService therapistService;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	public List<User> getAllUsers() {
        return userRepository.findAll();
    }
	
	/**
	 * Check if the username is available on the database
	 * @param username
	 * @return true if the Username does not exist
	 */
	public boolean checkUsernameAvailability(String username) {
		return !userRepository.findByUsername(username).isPresent();
	}

	public User create(User user) throws ResourceAlreadyExistsException {
		if( checkUsernameAvailability(user.getUsername()) ) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			return userRepository.save(user);
		} else {
			throw new ResourceAlreadyExistsException("User", "Username", user.getUsername());
		}
	}

	public User findById(Integer id){
		return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}
	
	public Optional<User> findByUsername(String username){
		return userRepository.findByUsername(username);
	}
	
	public User update(Integer id, User userDetails) throws ResourceAlreadyExistsException {
		
		User user = userRepository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));       
	       	        
		BeanUtils.copyProperties(userDetails, user, IgnoredProperties.getIgnoredProperties(Model.USER));
	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        
	    if(userDetails.getTherapist() != null) {
	    	therapistService.update(user.getTherapist().getId(), userDetails.getTherapist());
	    }
	        
	    return userRepository.save(user);
	}

	public ResponseEntity<?> delete(Integer id) {
		User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		userRepository.delete(user);

        return ResponseEntity.ok().build();
	}
}
