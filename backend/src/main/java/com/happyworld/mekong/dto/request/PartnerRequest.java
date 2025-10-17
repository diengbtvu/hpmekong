package com.happyworld.mekong.dto.request;

import com.happyworld.mekong.entity.Partner;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartnerRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String nameEn;

    @NotBlank(message = "Logo URL is required")
    private String logoUrl;

    private String websiteUrl;

    private String description;

    private String descriptionEn;

    @NotNull(message = "Partner type is required")
    private Partner.PartnerType type;

    private Integer displayOrder = 0;

    private Boolean isActive = true;

    private Boolean isFeatured = false;
}

