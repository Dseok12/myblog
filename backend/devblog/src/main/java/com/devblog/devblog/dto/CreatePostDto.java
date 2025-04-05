package com.devblog.devblog.dto;

import lombok.Data;

import jakarta.validation.constraints.NotNull;  // javax에서 jakarta로 변경
import java.util.Date;

@Data
public class CreatePostDto {
    @NotNull(message = "게시글 종류는 필수 항목입니다.")
    private String postType;  // 게시글 종류 (모임, 스터디, 잡담 등)

    private String title;
    private String content;
    private String location;  // 모임 장소
    private Date startDate;   // 시작일
    private Date endDate;     // 종료일
    private Integer expectedCost;  // 예상 비용
    private Integer numOfPeople;  // 모임 인원
    private Integer perPersonCost;  // 1인당 예상 비용
}
