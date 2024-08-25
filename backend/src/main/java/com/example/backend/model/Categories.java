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
@Table(schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
public class Categories {

    @Id
    @GeneratedValue
    private int ctg_id;

    private String name;

    private String descpcrition;

    @Column(nullable = false)
    private Timestamp created_at;
}
