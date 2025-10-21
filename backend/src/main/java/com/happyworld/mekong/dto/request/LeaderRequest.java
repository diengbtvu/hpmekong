package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderRequest {
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Position is required")
    private String position;
    
    private String avatarUrl;
    private String bio;
    private String email;
    private String phone;
    private String linkedinUrl;
    private String facebookUrl;
    private String twitterUrl;
    private Integer displayOrder;
    private Boolean isActive;
    private Boolean isFeatured;
}
