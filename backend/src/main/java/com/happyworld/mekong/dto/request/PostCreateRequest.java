package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PostCreateRequest {

    @NotBlank(message = "Tiêu đề là bắt buộc")
    @Size(max = 500)
    private String title;

    @Size(max = 500)
    private String titleEn;

    @Size(max = 1000)
    private String excerpt;

    @Size(max = 1000)
    private String excerptEn;

    @NotBlank(message = "Nội dung là bắt buộc")
    private String content;

    private String contentEn;

    private String featuredImageUrl;
    
    private Long categoryId;
    
    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
    
    private Boolean isFeatured = false;
    private Boolean allowComments = true;
}

