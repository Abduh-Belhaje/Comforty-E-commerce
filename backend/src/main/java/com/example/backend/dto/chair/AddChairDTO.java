package com.example.backend.dto.chair;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddChairDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("categoty")
    private String categoty;

    @JsonProperty("image")
    private MultipartFile image;

    @JsonProperty("description")
    private String description;

    @JsonProperty("color")
    private String color;

    @JsonProperty("height")
    private float height;

    @JsonProperty("weight")
    private float weight;

}
