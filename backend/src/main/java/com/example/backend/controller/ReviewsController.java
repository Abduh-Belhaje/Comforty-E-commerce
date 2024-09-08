package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/reviews")
@AllArgsConstructor
public class ReviewsController {

    private ReviewService reviewService;

    @Operation(summary = "Get Chair Reviews", responses = {
            @ApiResponse(responseCode = "200", description = "Successfull Operation"),
            @ApiResponse(responseCode = "401", description = "Operation failed")
    })
    @GetMapping("/{name}")
    public ResponseEntity<?> getChairRviews(@PathVariable String name) {
        try {
            return ResponseEntity.ok(reviewService.getChairReviews(name));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
