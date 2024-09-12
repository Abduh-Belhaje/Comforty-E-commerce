package com.example.backend.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
