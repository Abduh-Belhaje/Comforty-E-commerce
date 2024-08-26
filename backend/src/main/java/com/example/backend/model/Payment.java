package com.example.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue
    private int p_id;

    @Column(nullable = false)
    private int order_id;

    private double amount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethods p_method;

    @Column(nullable = false)
    private Timestamp payment_date;

}
