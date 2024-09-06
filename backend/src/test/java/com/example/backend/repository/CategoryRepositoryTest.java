package com.example.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.Timestamp;
import java.util.List;

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
        Category category1 = new Category("ctg1", "ABAB", new Timestamp(System.currentTimeMillis()));
        Category category2 = new Category("ctg2", "ABAB", new Timestamp(System.currentTimeMillis()));
        Category category3 = new Category("ctg3", "ABAB", new Timestamp(System.currentTimeMillis()));

        underTest.save(category1);
        underTest.save(category2);
        underTest.save(category3);
    }

    @Test
    void shouldFindCategoryByName() {
        String name = "ctg1";

        Long id = underTest.findCategoryByName(name);
        assertNotNull(id);
    }

    @Test
    void shoudlReturnAllcategoriesName() {
        List<String> categories = underTest.getAllGategories();

        assertNotNull(categories);
        assertThat(categories.size()).isEqualTo(3);
    }
}
