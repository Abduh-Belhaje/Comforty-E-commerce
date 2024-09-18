package com.example.backend.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    private String secretKey;

    @PostConstruct
    public void initSecretKey() {
        Stripe.apiKey = secretKey;
    }
}