package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Slug is required")
    private String slug;

    private String excerpt;

    private String content;

    private String featuredImageUrl;

    private Long categoryId;

    private Long authorId;

    private String status; // DRAFT, PUBLISHED, ARCHIVED

    private Boolean isFeatured = false;

    private Boolean allowComments = true;

    private String metaTitle;

    private String metaDescription;

    private String metaKeywords;

    private Boolean isActive = true;
}

