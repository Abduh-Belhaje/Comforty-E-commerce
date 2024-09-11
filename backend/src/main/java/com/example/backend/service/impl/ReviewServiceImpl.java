package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.chair.ChairReviewsDTO;
import com.example.backend.dto.review.AddReviewDTO;
import com.example.backend.mapper.ChairMapper;
import com.example.backend.repository.ReviewRepository;
import com.example.backend.service.ReviewService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ChairMapper chairMapper;

    @Override
    public List<ChairReviewsDTO> getChairReviews(String name) {
        return chairMapper.toChairReviewsDTO(reviewRepository.getChairReviews(name));
    }

    @Override
    public void addReview(AddReviewDTO request) {
        reviewRepository.addReview(request.getUser_email(), request.getChair_name(), request.getRating(),
                request.getComment());
    }

}
