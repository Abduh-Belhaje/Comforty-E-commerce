package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInRequest {

    String u_email;

    public String getU_email() {
        return u_email;
    }
}
