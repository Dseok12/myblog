package com.devblog.devblog.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 게시글 고유 ID

    private String title;  // 제목
    private String content;  // 내용

    @Enumerated(EnumType.STRING)
    private PostType postType;  // 게시글 종류 (모임, 스터디, 잡담 등)

    private String location;  // 모임 위치 (예: 서울)

    @Temporal(TemporalType.DATE)
    private Date startDate;  // 시작일

    @Temporal(TemporalType.DATE)
    private Date endDate;  // 종료일

    private Integer expectedCost;  // 예상 비용
    private Integer numOfPeople;  // 모임 인원
    private Integer perPersonCost;  // 1인당 예상 비용

    @ManyToOne
    @JoinColumn(name = "user_id")  // 사용자와의 관계 설정
    private User user;  // 게시글 작성자 (User와 연관)

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate = new Date();  // 게시글 작성일 (기본값 현재 시간)
}
