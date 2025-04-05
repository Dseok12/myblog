package com.devblog.devblog.service;

import com.devblog.devblog.dto.*;
import com.devblog.devblog.entity.Role;
import com.devblog.devblog.entity.User;
import com.devblog.devblog.repository.UserRepository;
import com.devblog.devblog.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입
    public void signup(UserDto req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("이미 존재하는 이메일입니다");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setGender(req.getGender());
        user.setAgreedToTerms(req.isAgreedToTerms());
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    // 로그인
    public LoginResponse login(UserDto req) {
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(
                () -> new RuntimeException("이메일이 존재하지 않습니다.")  // null을 처리하는 부분
        );

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtUtil.generateToken(user);
        return new LoginResponse(token, user.getUsername(), user.getRole().name());
    }

    // 회원 탈퇴
    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }
}