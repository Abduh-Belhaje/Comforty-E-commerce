package com.example.backend.service.impl;

import org.springframework.stereotype.Service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;
import com.example.backend.model.Role;
import com.example.backend.model.Users;
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

    @Override
    public JwtResponse Signin(SignInRequest request) throws EmailNotFoundException {

        var user = userRepository.findUserByEmail(request.getU_email())
                .orElseThrow(() -> new EmailNotFoundException("Email " + request.getU_email() + " doesn't exsit ."));
        var jwt = jwtService.generateToken(user);

        return new JwtResponse(jwt);
    }

    @Override
    public JwtResponse Signup(SignupRequest request) throws EmailAlreadyExistsException {
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
