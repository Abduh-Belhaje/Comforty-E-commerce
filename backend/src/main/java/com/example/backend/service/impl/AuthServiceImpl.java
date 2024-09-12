package com.example.backend.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import com.example.backend.dto.auth.JwtResponse;
import com.example.backend.dto.auth.SignInRequest;
import com.example.backend.dto.auth.SignUpRequest;
import com.example.backend.exception.AuthenticationFailedException;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;

import lombok.AllArgsConstructor;

import java.sql.Timestamp;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public JwtResponse Signin(SignInRequest request) throws EmailNotFoundException, AuthenticationFailedException {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            var user = userRepository.findUserByEmail(request.getEmail())
                    .orElseThrow(
                            () -> new EmailNotFoundException("Email " + request.getEmail() + " doesn't exsit ."));

            var jwt = jwtService.generateToken(user);
            JwtResponse jwtAuthResponse = new JwtResponse(jwt);
            jwtAuthResponse.setToken(jwt);

            return new JwtResponse(jwt);
        } catch (AuthenticationException e) {
            throw new AuthenticationFailedException("Authentication failed : " + e.getMessage());
        }
    }

    @Override
    public JwtResponse Signup(SignUpRequest request) throws EmailAlreadyExistsException {
        boolean exist = userRepository.existsByEmail(request.getU_email());

        if (!exist) {
            User user = new User(request.getFirst_name(), request.getLast_name(), request.getU_email(),
                    passwordEncoder.encode(request.getPassword()), Role.CUSTOMER,
                    new Timestamp(System.currentTimeMillis()));

            user = userRepository.save(user);
            var jwt = jwtService.generateToken(user);

            return new JwtResponse(jwt);
        } else {
            throw new EmailAlreadyExistsException("Email already exists in the database : ", request.getU_email());
        }

    }

}
