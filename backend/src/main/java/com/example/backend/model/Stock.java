package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
public class Stock {

    @Id
    private Long chair_id;

    private int quantity;
}
