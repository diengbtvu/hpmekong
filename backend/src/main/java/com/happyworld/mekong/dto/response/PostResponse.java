package com.happyworld.mekong.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {

    private Long id;
    private String title;
    private String slug;
    private String excerpt;
    private String content;
    
    private String featuredImageUrl;
    
    private CategoryResponse category;
    private AuthorResponse author;
    
    private String status;
    private Boolean isFeatured;
    private Boolean allowComments;
    
    private Integer viewCount;
    private Integer commentCount;
    private Integer likeCount;
    private Integer shareCount;
    
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthorResponse {
        private Long id;
        private String name;
        private String avatarUrl;
    }
}

