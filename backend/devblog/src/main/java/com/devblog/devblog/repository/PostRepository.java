package com.devblog.devblog.repository;

import com.devblog.devblog.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    // 특정 사용자 ID에 해당하는 게시글 조회
    List<Post> findByUserId(Long userId);

    // 게시글 타입별 조회
    List<Post> findByPostType(String postType);
}
