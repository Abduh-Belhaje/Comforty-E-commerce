package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Images", schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
public class Image {

    @Id
    private String name;

    @Column(nullable = false)
    private String image_url;
}
