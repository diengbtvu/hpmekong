package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Slug is required")
    private String slug;

    private String subtitle;

    private String description;
    
    // Content fields (will be stored as JSON)
    private List<String> whatYouWillLearn;
    
    private List<String> requirements;
    
    private List<String> targetAudience;

    private String thumbnailUrl;

    private String previewVideoUrl;

    @NotNull(message = "Center ID is required")
    private Long centerId;

    private Long categoryId;

    private Long instructorId;

    private BigDecimal price;

    private BigDecimal originalPrice;

    private Integer discountPercentage;

    private Boolean isFree = false;

    private String level; // ALL_LEVELS, BEGINNER, INTERMEDIATE, ADVANCED, EXPERT

    private String language = "vi";
    
    private String deliveryMode = "ONLINE"; // ONLINE, OFFLINE, HYBRID

    private Integer durationHours;

    private Integer totalLessons;

    private Integer maxStudents;

    private Boolean hasCertificate = false;

    private String status; // DRAFT, PUBLISHED, ARCHIVED

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean isActive = true;

    private Integer displayOrder = 0;
}

