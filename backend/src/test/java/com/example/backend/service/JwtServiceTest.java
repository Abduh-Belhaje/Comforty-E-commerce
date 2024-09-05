package com.example.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.service.impl.JwtServiceImpl;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setup() {
        jwtService = new JwtServiceImpl();
    }

    @Test
    void CheckTokenGeneration() {

        UserDetails userDetails = new User("abdo", "belhaj", "abdo@gmail.com", Role.CUSTOMER,
                new Timestamp(System.currentTimeMillis()));

        String jwt = jwtService.generateToken(userDetails);

        assertNotNull(jwt);
    }

    @Test
    public void testExtractUserName_Success() {

        // Generate token
        UserDetails userDetails = new User("abdo", "belhaj", "abdo@gmail.com", Role.CUSTOMER,
                new Timestamp(System.currentTimeMillis()));

        String jwt = jwtService.generateToken(userDetails);

        // extract username
        String username = jwtService.extractUserName(jwt);

        // Assert
        assertEquals(userDetails.getUsername(), username);
    }

    @Test
    public void testIsTokenValid_ValidToken() {
        // Generate token
        UserDetails userDetails = new User("abdo", "belhaj", "abdo@gmail.com", Role.CUSTOMER,
                new Timestamp(System.currentTimeMillis()));

        String jwt = jwtService.generateToken(userDetails);

        boolean isValid = jwtService.isTokenValid(jwt, userDetails);

        assertThat(isValid).isTrue();
    }

    @Test
    public void testIsTokenValid_InValidToken() {

        UserDetails userDetails = new User("abdo", "belhaj", "abdo@gmail.com", Role.CUSTOMER,
                new Timestamp(System.currentTimeMillis()));

        UserDetails userDetails2 = new User("Ali", "sma9lo", "Ali@gmail.com", Role.CUSTOMER,
                new Timestamp(System.currentTimeMillis()));

        // generate the token with the first variable
        String jwt = jwtService.generateToken(userDetails);

        // testing with the second variable
        boolean isValid = jwtService.isTokenValid(jwt, userDetails2);

        assertThat(isValid).isFalse();

    }
}
