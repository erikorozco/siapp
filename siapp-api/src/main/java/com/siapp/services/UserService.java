package com.siapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.User;
import com.siapp.repositories.UserRepository;


@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public List<User> getAllUsers() {
        return userRepository.findAll();
    }

	public User create(User user) {
		return userRepository.save(user);
	}

	public User findById(Integer id){
		return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}
	
	public User update(Integer id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        return userRepository.save(user);
	}

	public ResponseEntity<?> delete(Integer id) {
		User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", id));

		userRepository.delete(user);

        return ResponseEntity.ok().build();
	}
}
