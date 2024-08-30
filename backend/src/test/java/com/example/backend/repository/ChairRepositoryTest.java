package com.example.backend.repository;

import java.sql.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.backend.model.Chair;

@DataJpaTest
public class ChairRepositoryTest {

    @Autowired
    private ChairRepository underTest;

    @BeforeEach
    void setup() {
        Chair chair = new Chair(1L, "alpha", "abab", "NEW", "abab", "red", 10, 10,
                new Timestamp(System.currentTimeMillis()));

        underTest.save(chair);
    }

    @Test
    void testMethod() {

    }
}
