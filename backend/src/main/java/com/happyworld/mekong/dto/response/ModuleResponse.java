package com.happyworld.mekong.dto.response;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModuleResponse {

    private Long id;
    private String title;
    private String description;
    private Integer displayOrder;
    private Integer durationMinutes;
    private List<LessonResponse> lessons;
}
