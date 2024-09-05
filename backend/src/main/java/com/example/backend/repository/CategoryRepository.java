package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dto.chair.ChairDTO;
import com.example.backend.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c.ctg_id FROM Category c WHERE c.name = :name")
    Long findCategoryByName(@Param("name") String name);

    @Query(value = "SELECT * FROM catalog.getAllChairs", nativeQuery = true)
    List<ChairDTO> getAllChairs();
}
