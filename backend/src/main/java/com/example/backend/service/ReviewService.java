package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.chair.ChairReviewsDTO;

public interface ReviewService {

    List<ChairReviewsDTO> getChairReviews(String name);

}
