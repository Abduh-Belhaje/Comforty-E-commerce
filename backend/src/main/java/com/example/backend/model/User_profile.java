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
@Table(name = "user_profile", schema = "accounts")
@Getter
@Setter
@NoArgsConstructor
public class User_profile {

    @Id
    @GeneratedValue
    private Long profile_id;

    @Column(nullable = false)
    private int user_id;

    private String picture_url;

    private String phone_number;

    @Column(nullable = false)
    private String status;

    private String address;

    private String country;

    private String city;

    @Column(nullable = false)
    private Timestamp created_at;

}
