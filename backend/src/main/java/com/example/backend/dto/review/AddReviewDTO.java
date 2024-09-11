package com.example.backend.dto.review;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddReviewDTO {

    @JsonProperty("email")
    private String user_email;

    @JsonProperty("name")
    private String chair_name;

    @JsonProperty("rating")
    private int rating;

    @JsonProperty("comment")
    private String comment;
}
