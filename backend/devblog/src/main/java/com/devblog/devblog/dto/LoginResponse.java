package com.devblog.devblog.dto;

public class LoginResponse {
    public String token;
    public String username;
    public String role;

    public LoginResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }
}