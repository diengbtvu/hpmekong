package com.happyworld.mekong.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.happyworld.mekong.entity.Partner;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PartnerResponse {

    private Long id;
    private String name;
    private String nameEn;
    private String logoUrl;
    private String websiteUrl;
    private String description;
    private String descriptionEn;
    private Partner.PartnerType type;
    private Integer displayOrder;
    private Boolean isActive;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

