package com.comforty_backend.model;

import java.sql.Timestamp;
// import java.util.Collection;
// import java.util.List;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "client")
@Getter
@Setter
@NoArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int u_id;

    @Column(nullable = false)
    private String first_name;

    @Column(nullable = false)
    private String last_name;

    @Column(nullable = false, unique = true)
    private String u_email;

    @Column(nullable = false)
    private String u_password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private Timestamp created_at;

    public Client(String first_name, String last_name, String c_email, String c_password, Role role,
            Timestamp created_at) {

        this.first_name = first_name;
        this.last_name = last_name;
        this.u_email = c_email;
        this.u_password = c_password;
        this.role = role;
        this.created_at = created_at;
    }

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    // return List.of(new SimpleGrantedAuthority(role.name()));
    // }

    // @Override
    // public String getPassword() {
    // return u_password;
    // }

    // @Override
    // public String getUsername() {
    // return u_email;
    // }

}
