package com.example.backend.repository;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.Timestamp;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.backend.model.Category;

@DataJpaTest
public class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository underTest;

    @BeforeEach
    public void setup() {
        Category category = new Category("ctg1", "ABAB", new Timestamp(System.currentTimeMillis()));

        underTest.save(category);
    }

    @Test
    void shouldFindCategoryByName() {
        String name = "ctg1";

        Optional<Long> id = underTest.findCategoryByName(name);
        assertNotNull(id);
    }
}
