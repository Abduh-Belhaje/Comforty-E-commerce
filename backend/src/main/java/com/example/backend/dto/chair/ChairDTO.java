package com.example.backend.dto.chair;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChairDTO {

    private String name;

    private String description;

    private String status;

    private String color;

    private String height;

    private String weight;

    private String discount;

    private String image_url;
}
