package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModuleRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Integer displayOrder;

    private List<LessonRequest> lessons;
}
