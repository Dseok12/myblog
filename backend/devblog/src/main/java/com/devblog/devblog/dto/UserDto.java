package com.devblog.devblog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String gender;
    private boolean agreedToTerms;
}
