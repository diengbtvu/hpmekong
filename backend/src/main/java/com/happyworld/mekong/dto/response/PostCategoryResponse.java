package com.happyworld.mekong.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCategoryResponse {
    
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String color;
    private String icon;
    private Integer displayOrder;
    private Boolean isActive;
}
