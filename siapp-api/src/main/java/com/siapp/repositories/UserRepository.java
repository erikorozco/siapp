package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
}
