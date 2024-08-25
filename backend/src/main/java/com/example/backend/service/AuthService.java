package com.example.backend.service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignUpRequest;

public interface AuthService {

    JwtResponse Signin(SignInRequest request);

    JwtResponse Signup(SignUpRequest request);
}