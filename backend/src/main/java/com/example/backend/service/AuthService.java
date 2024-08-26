package com.example.backend.service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignUpRequest;
import com.example.backend.exception.EmailAlreadyExistsException;

public interface AuthService {

    JwtResponse Signin(SignInRequest request);

    JwtResponse Signup(SignUpRequest request) throws EmailAlreadyExistsException;
}