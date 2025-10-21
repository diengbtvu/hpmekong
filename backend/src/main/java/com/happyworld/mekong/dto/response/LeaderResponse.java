package com.happyworld.mekong.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderResponse {
    private Long id;
    private String fullName;
    private String position;
    private String avatarUrl;
    private String bio;
    private String email;
    private String phone;
    private String linkedinUrl;
    private String facebookUrl;
    private String twitterUrl;
    private Integer displayOrder;
    private Boolean isActive;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
