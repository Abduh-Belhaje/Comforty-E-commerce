package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.auth.SignInRequest;
import com.example.backend.dto.auth.SignUpRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @Operation(summary = "Sign in", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully signed in"),
            @ApiResponse(responseCode = "401", description = "Authentication failed")
    })
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest request) {

        try {
            return ResponseEntity.ok(authService.Signin(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed : " + e.getMessage());
        }

    }

    @Operation(summary = "Sign up", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully signed up"),
            @ApiResponse(responseCode = "400", description = "Email already exists")
    })
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {

        try {
            return ResponseEntity.ok(authService.Signup(request));
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authentication failed : " + e.getMessage());
        }

    }
}
