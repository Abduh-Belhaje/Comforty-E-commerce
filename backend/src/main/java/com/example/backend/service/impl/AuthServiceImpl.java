package com.example.backend.service.impl;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignUpRequest;
import com.example.backend.model.Users;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;

import lombok.AllArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtResponse Signin(SignInRequest request) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getU_email(), request.getU_psswd()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var user = userRepository.findUserByEmail(request.getU_email())
                .orElseThrow(() -> new IllegalArgumentException("INvalid email or password"));
        var jwt = jwtService.generateToken(user);

        JwtResponse jwtAuthResponse = new JwtResponse();
        jwtAuthResponse.setToken(jwt);

        return jwtAuthResponse;
    }

    @Override
    public JwtResponse Signup(SignUpRequest request) {
        boolean exist = userRepository.existsByEmail(request.getU_email());

        if (!exist) {
            Users user = new Users();

            user = userRepository.save(user);
            var jwt = jwtService.generateToken(user);

            JwtResponse jwtAuthResponse = new JwtResponse();
            jwtAuthResponse.setToken(jwt);

            return jwtAuthResponse;
        }
        return null;
    }

}
