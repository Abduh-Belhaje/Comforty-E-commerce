package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
