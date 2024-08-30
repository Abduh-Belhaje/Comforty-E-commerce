package com.example.backend.service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignUpRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;

public interface AuthService {

    JwtResponse Signin(SignInRequest request) throws EmailNotFoundException;

    JwtResponse Signup(SignUpRequest request) throws EmailAlreadyExistsException;
}