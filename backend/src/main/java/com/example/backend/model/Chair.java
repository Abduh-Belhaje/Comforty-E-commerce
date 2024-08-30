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
@Table(name = "Chairs", schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
public class Chair {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chair_seq")
    @SequenceGenerator(name = "chair_seq", sequenceName = "catalog.chair_seq", allocationSize = 1)
    private Long chair_id;

    @Column(nullable = false)
    private Long ctg_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private float height;

    @Column(nullable = false)
    private float weight;

    private float discount;

    @Column(nullable = false)
    private Timestamp created_at;

    public Chair(Long ctg_id, String name, String status, String description, String color,
            float height, float weight, Timestamp created_at) {
        this.ctg_id = ctg_id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.color = color;
        this.height = height;
        this.weight = weight;
        this.created_at = created_at;
    }

}
