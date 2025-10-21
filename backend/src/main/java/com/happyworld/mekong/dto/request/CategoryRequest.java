package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Slug is required")
    private String slug;

    private String description;
    
    private String icon;
    
    private String color;
    
    private Long parentId;
    
    private Integer displayOrder;
    
    private Boolean isActive;
}
