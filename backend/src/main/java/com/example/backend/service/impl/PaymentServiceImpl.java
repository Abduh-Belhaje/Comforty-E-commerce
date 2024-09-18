package com.example.backend.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.exception.StripeException;
import com.example.backend.dto.payment.PaymentRequest;
import com.example.backend.service.PaymentService;
import com.stripe.model.PaymentIntent;

@Service
public class PaymentServiceImpl implements PaymentService {

    private String secretKey;

    @Override
    public PaymentIntent createPaymentIntent(PaymentRequest request) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", request.getAmount()); // amount in smallest currency unit (e.g., cents for USD)
        params.put("currency", request.getCurrency());
        params.put("payment_method_types", List.of("card"));

        // Create a PaymentIntent with the given parameters
        return PaymentIntent.create(params);
    }

}
