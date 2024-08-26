package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignUpRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;
import com.example.backend.service.AuthService;

@RestController
@RequestMapping("auth")
public class AuthController {

    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(SignInRequest request) {

        try {
            return ResponseEntity.ok(authService.Signin(request));
        } catch (EmailNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed : " + e.getMessage());
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(SignUpRequest request) {

        try {
            return ResponseEntity.ok(authService.Signup(request));
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authentication failed : " + e.getMessage());
        }

    }
}
