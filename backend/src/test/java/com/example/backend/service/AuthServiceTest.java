package com.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;
import com.example.backend.model.Role;
import com.example.backend.model.Users;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.impl.AuthServiceImpl;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

        private AuthService authService;
        @Mock
        private UserRepository userRepository;
        @Mock
        private JwtService jwtService;
        @Mock
        private PasswordEncoder passwordEncoder;

        @BeforeEach
        void setup() {
                authService = new AuthServiceImpl(userRepository, jwtService);
        }

        @Test
        void signinForExistingUser() throws EmailNotFoundException {
                SignInRequest request = new SignInRequest(
                                "ali@gmail.com");

                Users User = new Users();

                given(userRepository.findUserByEmail(request.getU_email()))
                                .willReturn(Optional.of(User));

                given(jwtService.generateToken(User))
                                .willReturn("generated-token");

                // Call the method under test
                JwtResponse jwtResponse = authService.Signin(request);

                verify(userRepository).findUserByEmail("ali@gmail.com");
                assertThat(jwtResponse.getToken()).isEqualTo("generated-token");

        }

        @Test
        void signinForInExistingUser() throws EmailNotFoundException {

                SignInRequest request = new SignInRequest(
                                "ali@gmail.com");

                assertThatThrownBy(() -> authService.Signin(request))
                                .isInstanceOf(EmailNotFoundException.class)
                                .hasMessageContaining("Email " + request.getU_email() + " doesn't exsit .");

                // ensure that generateToken() func never called
                Users user = new Users();
                verify(jwtService, never()).generateToken(user);
        }

        @Test
        void signupForNewUser() throws EmailAlreadyExistsException {

                SignupRequest request = new SignupRequest("abdo", "belhaje", "abdo@gmail.com");

                when(userRepository.existsByEmail(request.getU_email()))
                                .thenReturn(false);

                authService.Signup(request);

                ArgumentCaptor<Users> UserArgumentCaptor = ArgumentCaptor.forClass(Users.class);
                verify(userRepository).save(UserArgumentCaptor.capture());
                assertThat(UserArgumentCaptor.getValue().getU_email()).isEqualTo(request.getU_email());
                assertThat(UserArgumentCaptor.getValue().getRole()).isEqualTo(Role.CUSTOMER);
        }

        @Test
        void signupForExistingUser() {
                SignupRequest request = new SignupRequest("abdo", "belhaje", "abdo@gmail.com");

                when(userRepository.existsByEmail(request.getU_email()))
                                .thenReturn(true);

                assertThatThrownBy(() -> authService.Signup(request))
                                .isInstanceOf(EmailAlreadyExistsException.class)
                                .hasMessage("Email already exists in the database.");
        }

}