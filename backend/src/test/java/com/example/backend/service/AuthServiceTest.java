package com.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.dto.auth.JwtResponse;
import com.example.backend.dto.auth.SignInRequest;
import com.example.backend.dto.auth.SignUpRequest;
import com.example.backend.exception.AuthenticationFailedException;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.impl.AuthServiceImpl;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

        private AuthServiceImpl authService;
        @Mock
        private UserRepository userRepository;
        @Mock
        private JwtService jwtService;
        @Mock
        private AuthenticationManager authenticationManager;
        @Mock
        private PasswordEncoder passwordEncoder;

        @BeforeEach
        void setup() {
                authService = new AuthServiceImpl(
                                userRepository,
                                jwtService,
                                authenticationManager,
                                passwordEncoder);
        }

        @Test
        void signinForExistingClient() throws AuthenticationFailedException, EmailNotFoundException {
                SignInRequest request = new SignInRequest(
                                "ali@gmail.com",
                                "renten");

                User client = new User();

                given(userRepository.findUserByEmail(request.getEmail()))
                                .willReturn(Optional.of(client));

                given(jwtService.generateToken(client))
                                .willReturn("generated-token");

                // Call the method under test
                JwtResponse jwtResponse = authService.Signin(request);

                verify(userRepository).findUserByEmail("ali@gmail.com");
                assertThat(jwtResponse.getToken()).isEqualTo("generated-token");

        }

        @Test
        void signinForInExistingClient() throws AuthenticationFailedException, EmailNotFoundException {
                SignInRequest request = new SignInRequest(
                                "ali@gmail.com",
                                "renten");

                assertThatThrownBy(() -> authService.Signin(request))
                                .isInstanceOf(EmailNotFoundException.class)
                                .hasMessageContaining("Email " + request.getEmail() + " doesn't exsit .");

                User client = new User();
                verify(jwtService, never()).generateToken(client);
        }

        @Test
        void signupForNewClient() throws EmailAlreadyExistsException {
                SignUpRequest request = new SignUpRequest(
                                "ali",
                                "alol",
                                "ali@gmail.com",
                                "*****");

                when(userRepository.existsByEmail(request.getU_email()))
                                .thenReturn(false);

                authService.Signup(request);

                ArgumentCaptor<User> clientArgumentCaptor = ArgumentCaptor.forClass(User.class);
                verify(userRepository).save(clientArgumentCaptor.capture());
                assertThat(clientArgumentCaptor.getValue().getUsername()).isEqualTo(request.getU_email());
                assertThat(clientArgumentCaptor.getValue().getRole()).isEqualTo(Role.CUSTOMER);

        }

        @Test
        void signupForExistingClient() {
                SignUpRequest request = new SignUpRequest(
                                "ali",
                                "alol",
                                "ali@gmail.com",
                                "rente");

                when(userRepository.existsByEmail(request.getU_email()))
                                .thenReturn(true);

                assertThatThrownBy(() -> authService.Signup(request))
                                .isInstanceOf(EmailAlreadyExistsException.class)
                                .hasMessage("Email already exists in the database : ", request.getU_email());
        }

}