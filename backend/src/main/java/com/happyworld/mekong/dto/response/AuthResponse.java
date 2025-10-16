package com.happyworld.mekong.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private UserResponse user;
    private String token;
    private String refreshToken;
    private Long expiresIn;
    private String tokenType = "Bearer";
    private Boolean requiresTwoFactor;
}

