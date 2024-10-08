package com.example.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignUpRequest {

    private String first_name;

    private String last_name;

    private String u_email;

    private String password;

}
