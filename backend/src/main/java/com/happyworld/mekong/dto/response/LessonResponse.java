package com.happyworld.mekong.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonResponse {

    private Long id;
    private String title;
    private String description;
    private String type;
    private String contentUrl;
    private Integer durationMinutes;
    private Integer displayOrder;
    private Boolean isPreview;
    private Boolean isFree;
}
