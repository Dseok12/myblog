package com.devblog.devblog.service;

import com.devblog.devblog.dto.CreatePostDto;
import com.devblog.devblog.entity.Post;
import com.devblog.devblog.entity.PostType;
import com.devblog.devblog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    // 게시글 생성
    public Post createPost(CreatePostDto dto, String token) {
        Post post = new Post();

        // Null 처리 및 기본값 설정
        String postType = dto.getPostType() != null ? dto.getPostType().toUpperCase() : PostType.STUDY.name();

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setPostType(PostType.valueOf(postType)); // PostType enum으로 변환
        post.setLocation(dto.getLocation());
        post.setStartDate(dto.getStartDate());
        post.setEndDate(dto.getEndDate());
        post.setExpectedCost(dto.getExpectedCost());
        post.setNumOfPeople(dto.getNumOfPeople());
        post.setPerPersonCost(dto.getPerPersonCost());

        return postRepository.save(post);
    }

    // 모든 게시글 조회
    public List<Post> getAllPosts() {
        return postRepository.findAll();  // 모든 게시글 조회
    }

    // 게시글 상세 조회
    public Post getPostDetail(Long postId) {
        Optional<Post> post = postRepository.findById(postId);  // 게시글 ID로 상세 조회
        return post.orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));  // 예외 처리
    }
}
