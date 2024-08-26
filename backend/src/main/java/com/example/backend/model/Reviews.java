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
public class Reviews {

    @Id
    @GeneratedValue
    private int review_id;

    @Column(nullable = false)
    private int user_id;

    @Column(nullable = false)
    private int chair_id;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private Timestamp created_at;

    public Reviews(int user_id, int chair_id, int rating, Timestamp created_at) {
        this.user_id = user_id;
        this.chair_id = chair_id;
        this.rating = rating;
        this.created_at = created_at;
    }
}
