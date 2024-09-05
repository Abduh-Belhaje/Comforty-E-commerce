package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @Operation(summary = "Get All chairs", responses = {
            @ApiResponse(responseCode = "200", description = "Successfull Operation"),
            @ApiResponse(responseCode = "401", description = "Operation failed")
    })
    @GetMapping("/chairs/{offset}/{size}")
    public ResponseEntity<?> getAllChairs(@PathVariable int offset, @PathVariable int size) {
        try {
            return ResponseEntity.ok(chairService.getAllChairs(offset, size));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Get the 4 Recent chairs", responses = {
            @ApiResponse(responseCode = "200", description = "Successfull Operation"),
            @ApiResponse(responseCode = "401", description = "Operation failed")
    })
    @GetMapping("/recent")
    public ResponseEntity<?> getRecentChairs() {
        try {
            return ResponseEntity.ok(chairService.recentlyAdded());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Get chair Details", responses = {
            @ApiResponse(responseCode = "200", description = "Successfull Operation"),
            @ApiResponse(responseCode = "401", description = "Operation failed")
    })
    @GetMapping("/{name}")
    public ResponseEntity<?> getRecentChairs(@PathVariable String name) {
        try {
            return ResponseEntity.ok(chairService.getChair(name));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Get chair by Category", responses = {
            @ApiResponse(responseCode = "200", description = "Successfull Operation"),
            @ApiResponse(responseCode = "401", description = "Operation failed")
    })
    @GetMapping("/ctg/{category}")
    public ResponseEntity<?> getChairsByCategory(@PathVariable String category) {
        try {
            return ResponseEntity.ok(chairService.getChairsByCategory(category));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
