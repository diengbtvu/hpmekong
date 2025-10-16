package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentResponse {

    private Long id;
    private CourseBasicResponse course;
    
    private String status;
    private BigDecimal progressPercentage;
    private Integer completedLessons;
    private Integer totalLessons;
    
    private Boolean certificateIssued;
    private LocalDateTime certificateIssuedAt;
    
    private LocalDateTime enrolledAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private LocalDateTime expiresAt;
    
    private BigDecimal amountPaid;
    private Boolean hasReviewed;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseBasicResponse {
        private Long id;
        private String title;
        private String slug;
        private String thumbnailUrl;
        private Integer totalLessons;
        private Integer durationHours;
    }
}

