package com.happyworld.mekong.dto.request;

import com.happyworld.mekong.entity.Achievement;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievementRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String titleEn;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String description;

    private String descriptionEn;

    private LocalDate achievementDate;

    @NotNull(message = "Achievement type is required")
    private Achievement.AchievementType type;

    private Integer displayOrder = 0;

    private Boolean isActive = true;

    private Boolean isFeatured = false;
}

