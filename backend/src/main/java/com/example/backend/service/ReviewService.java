package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.chair.ChairReviewsDTO;
import com.example.backend.dto.review.AddReviewDTO;

public interface ReviewService {

    List<ChairReviewsDTO> getChairReviews(String name);

    void addReview(AddReviewDTO request);

}
