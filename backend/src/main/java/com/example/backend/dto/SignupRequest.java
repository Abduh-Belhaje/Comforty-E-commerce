package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupRequest {

    private String first_name;

    private String last_name;

    private String u_email;

}
