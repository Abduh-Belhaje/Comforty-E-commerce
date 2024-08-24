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
@Table(name = "user_profile", schema = "client")
@Getter
@Setter
@NoArgsConstructor
public class Customer_profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profile_id;

    @Column(nullable = false)
    private int user_id;

    private String picture_url;

    @Column(nullable = false)
    private String status;

    private String address;

    private String country;

    private String city;

    @Column(nullable = false)
    private Timestamp created_at;

}
