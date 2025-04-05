package com.devblog.devblog.service;

import com.devblog.devblog.dto.*;
import com.devblog.devblog.entity.*;
import com.devblog.devblog.repository.UserRepository;
import com.devblog.devblog.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public void signup(UserDto req) {
        User user = new User();
        user.setUsername(req.username);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setEmail(req.email);
        user.setPhoneNumber(req.phoneNumber);
        user.setAgreedToTerms(req.agreedToTerms);
        user.setGender(req.gender);
        userRepository.save(user);
    }

    public LoginResponse login(UserDto req) {
        User user = userRepository.findByUsername(req.username).orElseThrow();
        if (!passwordEncoder.matches(req.password, user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다");
        }
        String token = jwtUtil.generateToken(user);
        return new LoginResponse(token, user.getUsername(), user.getRole().name());
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}