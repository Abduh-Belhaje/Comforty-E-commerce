package com.example.backend.service;

import com.example.backend.dto.payment.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface PaymentService {

    PaymentIntent createPaymentIntent(PaymentRequest paymentInfoRequest) throws StripeException;
}
