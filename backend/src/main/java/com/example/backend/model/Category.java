package com.example.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Categories", schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categories_seq")
    @SequenceGenerator(name = "categories_seq", sequenceName = "catalog.categories_seq", allocationSize = 1)
    private Long ctg_id;

    private String name;

    private String description;

    @Column(nullable = false)
    private Timestamp created_at;

    public Category(String name, String description, Timestamp created_at) {
        this.name = name;
        this.description = description;
        this.created_at = created_at;
    }
}
