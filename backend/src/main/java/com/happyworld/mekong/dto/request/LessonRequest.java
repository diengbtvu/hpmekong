package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private String type; // VIDEO, DOCUMENT, QUIZ, ASSIGNMENT, LIVE_SESSION

    private String contentUrl;

    private Integer durationMinutes;

    private Integer displayOrder;

    private Boolean isPreview = false;

    private Boolean isFree = false;
}
