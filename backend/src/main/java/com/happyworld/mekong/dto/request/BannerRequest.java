package com.happyworld.mekong.dto.request;

import com.happyworld.mekong.entity.Banner;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BannerRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String titleEn;

    private String subtitle;

    private String subtitleEn;

    private String description;

    private String descriptionEn;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String mobileImageUrl;

    private String linkUrl;

    private String linkText;

    private String linkTextEn;

    private Boolean openInNewTab = false;

    @NotNull(message = "Banner type is required")
    private Banner.BannerType type;

    private Integer displayOrder = 0;

    private Boolean isActive = true;

    private LocalDateTime startDate;

    private LocalDateTime endDate;
}

