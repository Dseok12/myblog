package com.devblog.devblog.repository;

import com.devblog.devblog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 회원가입 중복 검사
    Optional<User> findByUsername(String username);

    // 로그인용 (이메일 기준)
    Optional<User> findByEmail(String email);

    // 회원탈퇴용
    void deleteByUsername(String username);
}
