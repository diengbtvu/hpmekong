package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnrollmentRequest {

    @NotNull(message = "ID khóa học là bắt buộc")
    private Long courseId;

    private Long paymentId;
    private String couponCode;
}

