package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.Review;

import jakarta.transaction.Transactional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "SELECT * FROM catalog.get_reviews(:name)", nativeQuery = true)
    List<Object[]> getChairReviews(@Param("name") String name);

    @Modifying
    @Query(value = "CALL catalog.add_new_review(:userEmail,:chairName,:rate,:comment)", nativeQuery = true)
    @Transactional
    void addReview(
            @Param("userEmail") String userEmail,
            @Param("chairName") String chairName,
            @Param("rate") int rate,
            @Param("comment") String comment);
}
