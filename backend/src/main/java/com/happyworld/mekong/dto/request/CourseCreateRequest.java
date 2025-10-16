package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CourseCreateRequest {

    @NotBlank(message = "Tiêu đề khóa học là bắt buộc")
    @Size(max = 500)
    private String title;

    @Size(max = 500)
    private String subtitle;

    @NotBlank(message = "Mô tả khóa học là bắt buộc")
    private String description;

    private List<String> whatYouWillLearn;
    private List<String> requirements;
    private List<String> targetAudience;

    @NotNull(message = "Trung tâm là bắt buộc")
    private Long centerId;

    private Long categoryId;
    private Long instructorId;

    private String thumbnailUrl;
    private String previewVideoUrl;

    @NotNull(message = "Giá là bắt buộc")
    @DecimalMin(value = "0.0", message = "Giá phải >= 0")
    private BigDecimal price;

    private BigDecimal originalPrice;

    @Min(0) @Max(100)
    private Integer discountPercentage;

    private Boolean isFree = false;

    @NotNull(message = "Cấp độ là bắt buộc")
    private String level;

    private String language = "vi";
    private Integer durationHours;

    @NotNull(message = "Hình thức học là bắt buộc")
    private String deliveryMode;

    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
}

