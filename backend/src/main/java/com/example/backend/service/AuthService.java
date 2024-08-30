package com.example.backend.service;

import com.example.backend.dto.auth.JwtResponse;
import com.example.backend.dto.auth.SignInRequest;
import com.example.backend.dto.auth.SignupRequest;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.EmailNotFoundException;

public interface AuthService {

    JwtResponse Signin(SignInRequest request) throws EmailNotFoundException;

    JwtResponse Signup(SignupRequest request) throws EmailAlreadyExistsException;
}