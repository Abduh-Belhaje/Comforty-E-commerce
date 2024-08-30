package com.example.backend.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.model.Users;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.impl.UserServiceImpl;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    void loadUserDetails() {
        // case 1 : inexisting email
        String userEmail = "abdo@gmail.com";
        Users user = new Users();
        user.setU_email(userEmail);

        given(userRepository.findUserByEmail(userEmail))
                .willReturn(Optional.of(user));

        UserDetails result = userService.userDetailsService().loadUserByUsername(userEmail);

        assertNotNull(result);
    }
}
