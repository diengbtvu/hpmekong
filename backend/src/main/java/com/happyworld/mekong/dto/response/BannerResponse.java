package com.happyworld.mekong.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.happyworld.mekong.entity.Banner;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BannerResponse {

    private Long id;
    private String title;
    private String titleEn;
    private String subtitle;
    private String subtitleEn;
    private String description;
    private String descriptionEn;
    private String imageUrl;
    private String mobileImageUrl;
    private String linkUrl;
    private String linkText;
    private String linkTextEn;
    private Boolean openInNewTab;
    private Banner.BannerType type;
    private Integer displayOrder;
    private Boolean isActive;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer clickCount;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

