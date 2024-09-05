package com.example.backend.dto.chair;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChairInfoDTO {

    private String name;

    private String description;

    private String status;

    private String color;

    private String height;

    private String weight;

    private String discount;

    private List<String> images;

}
