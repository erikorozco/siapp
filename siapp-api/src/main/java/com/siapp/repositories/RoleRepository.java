package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>  {

}
