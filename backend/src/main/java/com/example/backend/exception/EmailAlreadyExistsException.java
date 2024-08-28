package com.example.backend.exception;

public class EmailAlreadyExistsException extends Exception {

    String mssg;
    String arg;

    public EmailAlreadyExistsException(String mssg, String arg) {
        super(mssg);
        this.arg = arg;
    }

    public String getArg() {
        return arg;
    }
}
