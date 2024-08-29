package com.example.backend.exception;

public class EmailNotFoundException extends Exception {

    String mssg;

    public EmailNotFoundException(String mssg) {
        super(mssg);
    }

}
