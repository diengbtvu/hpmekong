package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CenterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Slug is required")
    private String slug;

    private String tagline;

    private String description;

    private String logoUrl;

    private String coverImageUrl;

    private String primaryColor;

    private String email;

    private String phone;

    private String website;

    private Long managerId;

    private Boolean isActive = true;

    private Integer displayOrder = 0;

    private String metaTitle;

    private String metaDescription;

    private String metaKeywords;
}

