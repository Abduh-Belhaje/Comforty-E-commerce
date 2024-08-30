package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Chair;

@Repository
public interface ChairRepository extends JpaRepository<Chair, Long> {

}
