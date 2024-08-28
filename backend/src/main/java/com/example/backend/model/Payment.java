package com.example.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq")
    @SequenceGenerator(name = "payment_seq", sequenceName = "orders.payment_seq", allocationSize = 1)
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
