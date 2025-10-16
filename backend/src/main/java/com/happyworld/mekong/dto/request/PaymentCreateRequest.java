package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentCreateRequest {

    @NotNull(message = "Số tiền là bắt buộc")
    @DecimalMin(value = "1000", message = "Số tiền tối thiểu là 1,000 VND")
    private BigDecimal amount;

    @NotBlank(message = "Loại thanh toán là bắt buộc")
    private String paymentType; // course_enrollment, job_posting, etc.

    @NotNull(message = "ID tham chiếu là bắt buộc")
    private Long referenceId;

    private String couponCode;
    
    private String description;
}

