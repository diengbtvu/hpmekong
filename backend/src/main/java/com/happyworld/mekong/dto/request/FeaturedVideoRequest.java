package com.happyworld.mekong.dto.request;

import com.happyworld.mekong.entity.FeaturedVideo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeaturedVideoRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String titleEn;

    @NotBlank(message = "Thumbnail URL is required")
    private String thumbnailUrl;

    @NotBlank(message = "Video URL is required")
    private String videoUrl;

    private String description;

    private String descriptionEn;

    private Integer durationSeconds;

    @NotNull(message = "Video platform is required")
    private FeaturedVideo.VideoPlatform videoPlatform;

    private String videoId;

    @NotNull(message = "Video type is required")
    private FeaturedVideo.VideoType type;

    private Integer displayOrder = 0;

    private Boolean isActive = true;

    private Boolean isFeatured = false;

    private String author;

    private LocalDate publishedDate;
}

