package com.siapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siapp.models.Test;

public interface TestRepository  extends JpaRepository<Test, Integer> {

}
