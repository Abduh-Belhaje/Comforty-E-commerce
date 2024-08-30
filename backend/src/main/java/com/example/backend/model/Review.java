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
@Table(name = "Reviews", schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_seq")
    @SequenceGenerator(name = "review_seq", sequenceName = "catalog.review_seq", allocationSize = 1)
    private Long review_id;

    @Column(nullable = false)
    private int user_id;

    @Column(nullable = false)
    private int chair_id;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private Timestamp created_at;

    public Review(int user_id, int chair_id, int rating, Timestamp created_at) {
        this.user_id = user_id;
        this.chair_id = chair_id;
        this.rating = rating;
        this.created_at = created_at;
    }
}
