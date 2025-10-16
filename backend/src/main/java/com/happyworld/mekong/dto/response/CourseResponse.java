package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {

    private Long id;
    private String title;
    private String slug;
    private String subtitle;
    private String description;
    private List<String> whatYouWillLearn;
    private List<String> requirements;
    private List<String> targetAudience;
    
    private CenterBasicResponse center;
    private CategoryResponse category;
    private InstructorBasicResponse instructor;
    
    private String thumbnailUrl;
    private String previewVideoUrl;
    
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discountPercentage;
    private Boolean isFree;
    
    private String level;
    private String language;
    private Integer durationHours;
    private Integer totalLessons;
    private String deliveryMode;
    
    private String status;
    private Boolean isFeatured;
    private Boolean isBestseller;
    
    private Integer totalStudents;
    private BigDecimal averageRating;
    private Integer totalReviews;
    private Integer totalViews;
    
    private Boolean hasCertificate;
    private LocalDateTime publishedAt;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

