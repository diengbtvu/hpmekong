package com.happyworld.mekong.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CenterBasicResponse {
    private Long id;
    private String name;
    private String slug;
    private String tagline;
    private String description;
    private String logoUrl;
    private String coverImageUrl;
    private String primaryColor;
    private String email;
    private String phone;
    private String website;
    private Boolean isActive;
    private Integer displayOrder;
}

