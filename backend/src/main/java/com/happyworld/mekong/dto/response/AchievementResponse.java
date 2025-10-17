package com.happyworld.mekong.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.happyworld.mekong.entity.Achievement;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AchievementResponse {

    private Long id;
    private String title;
    private String titleEn;
    private String imageUrl;
    private String description;
    private String descriptionEn;
    private LocalDate achievementDate;
    private Achievement.AchievementType type;
    private Integer displayOrder;
    private Boolean isActive;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

