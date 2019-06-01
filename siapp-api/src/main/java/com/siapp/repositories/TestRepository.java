package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.siapp.models.User;

public interface TestRepository  extends JpaRepository<User, Integer> {

	@Modifying
    @Transactional
	@Query(
	value = "DELETE FROM usuario_rol",
	nativeQuery = true)
	void deleteAllRecordTherapists();
	
	@Modifying
    @Transactional
	@Query(
	value = "DELETE FROM usuario",
	nativeQuery = true)
	void deleteAllUsers();
	
	@Modifying
    @Transactional
	@Query(
	value = "DELETE FROM rol",
	nativeQuery = true)
	void deleteAllRoles();
}
