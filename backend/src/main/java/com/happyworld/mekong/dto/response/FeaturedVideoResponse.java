package com.happyworld.mekong.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.happyworld.mekong.entity.FeaturedVideo;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FeaturedVideoResponse {

    private Long id;
    private String title;
    private String titleEn;
    private String thumbnailUrl;
    private String videoUrl;
    private String description;
    private String descriptionEn;
    private Integer durationSeconds;
    private FeaturedVideo.VideoPlatform videoPlatform;
    private String videoId;
    private FeaturedVideo.VideoType type;
    private Integer displayOrder;
    private Boolean isActive;
    private Boolean isFeatured;
    private Integer viewCount;
    private String author;
    private LocalDate publishedDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

