package com.happyworld.mekong.dto.response;

import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String email;
    private String username;
    private String phone;
    private Boolean isActive;
    private Boolean isVerified;
    private LocalDateTime lastLoginAt;
    
    // From Profile
    private String fullName;
    private String avatarUrl;
    
    // Roles
    private Set<String> roles;
    
    private LocalDateTime createdAt;
}

