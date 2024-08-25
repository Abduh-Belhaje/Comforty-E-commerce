package com.example.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class OrderDetails {

    @Id
    @GeneratedValue
    private int orderItem_id;

    @Column(nullable = false)
    private int order_id;

    @Column(nullable = false)
    private int chair_id;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private float price;

    @Column(nullable = false)
    private Timestamp created_at;

    public OrderDetails(int order, int chair, int quantity, float price, Timestamp created_at) {
        this.order_id = order;
        this.chair_id = chair;
        this.quantity = quantity;
        this.price = price;
        this.created_at = created_at;
    }

}
