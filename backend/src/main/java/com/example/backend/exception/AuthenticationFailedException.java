package com.example.backend.exception;

public class AuthenticationFailedException extends Exception {

    public AuthenticationFailedException(String mssg) {
        super(mssg);
    }

}
