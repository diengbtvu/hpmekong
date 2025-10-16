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
    private String logoUrl;
    private String primaryColor;
}

