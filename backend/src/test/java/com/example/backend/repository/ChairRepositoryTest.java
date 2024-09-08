package com.example.backend.repository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.assertj.core.api.Assertions.assertThat;
import java.sql.Timestamp;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.backend.model.Chair;
import com.example.backend.model.Image;

@DataJpaTest
public class ChairRepositoryTest {

    @Autowired
    private ChairRepository underTest;

    @Autowired
    private ImageRepository imageRepository;

    @BeforeEach
    void setup() {
        Chair chair1 = new Chair(1L, "alpha", "NEW", "abab", "red", "10", "10", 10, "10", "10",
                new Timestamp(System.currentTimeMillis()));
        Chair chair2 = new Chair(2L, "beta", "NEW", "abab", "red", "10", "10", 10, "10", "10",
                new Timestamp(System.currentTimeMillis()));

        underTest.save(chair1);
        underTest.save(chair2);

        Image img1 = new Image("alpha", "img1_1.url");
        Image img2 = new Image("alpha", "img1_2.url");
        Image img3 = new Image("beta", "img2_1.url");
        Image img4 = new Image("beta", "img2_2.url");

        imageRepository.save(img1);
        imageRepository.save(img2);
        imageRepository.save(img3);
        imageRepository.save(img4);
    }

    @Test
    void shouldFindChairByName() {
        String name = "alpha";
        boolean result = underTest.existsByName(name);

        assertTrue(result);
    }

    @Test
    void shouldNotFindChairByName() {
        String name = "prd1";
        boolean result = underTest.existsByName(name);

        assertFalse(result);
    }

    @Test
    void shouldReturnAllChairs() {
        List<Object[]> result = underTest.getAllChairs(0, 2);

        assertNotNull(result);
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0)[7]).isEqualTo("img1_1.url");
        assertThat(result.get(1)[7]).isEqualTo("img2_1.url");
    }

    @Test
    void shouldReturnNbOfChairs() {
        Long nb = underTest.nbOfChairs();
        assertThat(nb).isEqualTo(2);
    }

}
