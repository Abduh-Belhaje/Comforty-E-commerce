package com.example.backend.service.impl;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignUpRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;
import com.example.backend.model.Role;
import com.example.backend.model.Users;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;

import lombok.AllArgsConstructor;

import org.springframework.security.core.Authentication;

import java.sql.Timestamp;

import org.springframework.security.authentication.AuthenticationManager;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtResponse Signin(SignInRequest request) throws EmailNotFoundException {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getU_email(), ""));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var user = userRepository.findUserByEmail(request.getU_email())
                .orElseThrow(() -> new EmailNotFoundException("Email doesn't exsit : " + request.getU_email()));
        var jwt = jwtService.generateToken(user);

        return new JwtResponse(jwt);
    }

    @Override
    public JwtResponse Signup(SignUpRequest request) throws EmailAlreadyExistsException {
        boolean exist = userRepository.existsByEmail(request.getU_email());

        if (!exist) {
            Users user = new Users(request.getFirst_name(), request.getLast_name(), request.getU_email(), Role.CUSTOMER,
                    new Timestamp(System.currentTimeMillis()));

            user = userRepository.save(user);
            var jwt = jwtService.generateToken(user);

            return new JwtResponse(jwt);
        } else {
            throw new EmailAlreadyExistsException("Email already exists in the database.", request.getU_email());
        }

    }

}
