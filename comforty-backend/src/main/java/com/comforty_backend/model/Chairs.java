package com.comforty_backend.model;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class Chairs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chair_id;

    @Column(nullable = false)
    private int ctg_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private float height;

    @Column(nullable = false)
    private float weight;

    @Column(nullable = false)
    private Timestamp created_at;

}
