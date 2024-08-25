package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    @Query("SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM Users WHERE u_email = :email")
    Boolean existsByEmail(@Param("email") String email);

    @Query("SELECT u FROM Users u WHERE u_email = :email")
    Optional<Users> findUserByEmail(@Param("email") String email);
}
