package com.example.backend.dto.chair;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ChairReviewsDTO
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChairReviewsDTO {

    private String first_name;

    private String last_name;

    private String comment;

    private BigDecimal rate;

    private String picture_url;
}