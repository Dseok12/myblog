package com.devblog.devblog.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private String phoneNumber;

    private boolean agreedToTerms;

    private String gender;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    private LocalDateTime banUntil;

    // Getters, Setters
}