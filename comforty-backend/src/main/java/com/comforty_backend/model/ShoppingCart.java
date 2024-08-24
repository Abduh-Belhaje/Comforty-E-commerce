package com.comforty_backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class ShoppingCart {

    @Id
    @Column(nullable = false)
    private int user_id;

    @Column(nullable = false)
    private int chair_id;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private Timestamp created_at;

}
