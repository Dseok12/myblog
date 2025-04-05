package com.devblog.devblog.controller;

import com.devblog.devblog.dto.CreatePostDto;
import com.devblog.devblog.entity.Post;
import com.devblog.devblog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 게시글 생성
    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody CreatePostDto dto, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Bearer 토큰에서 "Bearer " 부분을 제외
        Post post = postService.createPost(dto, token);
        return ResponseEntity.ok(post);
    }

    // 모든 게시글 조회
    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Bearer 토큰에서 "Bearer " 부분을 제외
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 특정 게시글 조회
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostDetail(@PathVariable Long postId) {
        Post post = postService.getPostDetail(postId); // 게시글 ID로 상세 조회
        return ResponseEntity.ok(post);
    }
}

