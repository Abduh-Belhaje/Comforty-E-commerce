package com.example.backend.repository;

import java.sql.Timestamp;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.backend.model.Role;
import com.example.backend.model.Users;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @BeforeEach
    void setup() {
        Users user = new Users("abdo", "belhaje", "abdo@gmail.com", "1234", Role.CUSTOMER,
                new Timestamp(System.currentTimeMillis()));
        underTest.save(user);
    }

    @Test
    void CheckExistingEmail() {
        // case 1 : existed email
        String email = "abdo@gmail.com";
        Boolean result = underTest.existsByEmail(email);

        assertThat(result).isTrue();

        // case 2 : inexisted email
        email = "abduh@gmail.com";
        result = underTest.existsByEmail(email);

        assertThat(result).isFalse();

    }

    @Test
    void getUserInfoByEmail() {

        String email = "abdo@gmail.com";
        Optional<Users> user = underTest.findUserByEmail(email);

        // email is unique so I don't need to add more checks
        assertThat(user).isPresent();
    }
}
