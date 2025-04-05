package com.devblog.devblog.controller;

import com.devblog.devblog.dto.LoginResponse;
import com.devblog.devblog.dto.UserDto;
import com.devblog.devblog.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto req) {
        userService.signup(req);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserDto req) {
        return ResponseEntity.ok(userService.login(req));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String username) {
        userService.deleteUser(username);
        return ResponseEntity.ok("회원탈퇴 완료");
    }
}
