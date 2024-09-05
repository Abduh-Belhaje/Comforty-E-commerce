package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Chair;

@Repository
public interface ChairRepository extends JpaRepository<Chair, Long> {

    @Query("SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM Chair WHERE name = :name")
    Boolean existsByName(@Param("name") String name);

    @Query(value = "SELECT * FROM catalog.getAllChairs LIMIT :size OFFSET :offset", nativeQuery = true)
    List<Object[]> getAllChairs(@Param("offset") int offset, @Param("size") int size);

    @Query(value = "SELECT * FROM catalog.getAllChairs", nativeQuery = true)
    List<Object[]> getAllChairs();

    @Query(value = "SELECT * FROM catalog.getRecentChairs", nativeQuery = true)
    List<Object[]> getRecentChairs();

    @Query(value = "SELECT * FROM catalog.get_Chair_info(:name)", nativeQuery = true)
    List<Object[]> getChairInfo(@Param("name") String name);

    @Query(value = "SELECT * FROM catalog.get_chairs_by_category(:category)", nativeQuery = true)
    List<Object[]> filterChairsByCategory(@Param("category") String category);

}
