package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.exception.FailedAddingChairException;
import com.example.backend.service.ChairService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/product")
@AllArgsConstructor
public class ChairController {

    private ChairService chairService;

    @Operation(summary = "Add Chair", responses = {
            @ApiResponse(responseCode = "200", description = "Chair added Successfully"),
            @ApiResponse(responseCode = "401", description = "Operation failed")
    })
    @PostMapping("/add")
    public ResponseEntity<?> addChair(@RequestBody AddChairDTO request) {
        try {
            chairService.addChair(request);
            return ResponseEntity.ok().body("New chair added");
        } catch (FailedAddingChairException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/test")
    public void test(@RequestParam("testfile") MultipartFile request) {

        System.out.println(request);
    }
}
