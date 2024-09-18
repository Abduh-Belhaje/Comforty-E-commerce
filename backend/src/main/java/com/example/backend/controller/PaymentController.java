package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.payment.PaymentRequest;
import com.example.backend.service.PaymentService;
import com.stripe.model.PaymentIntent;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/payment")
public class PaymentController {

    private PaymentService paymentService;

    @PostMapping("/payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest request) {
        try {
            // Create a payment intent with the requested amount and currency
            PaymentIntent paymentIntent = paymentService.createPaymentIntent(request);

            return ResponseEntity.ok(paymentIntent.getClientSecret());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
