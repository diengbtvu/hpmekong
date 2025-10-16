package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private Long id;
    private String paymentCode;
    
    private BigDecimal amount;
    private String currency;
    private BigDecimal discountAmount;
    private BigDecimal finalAmount;
    
    private String paymentMethod;
    private String paymentType;
    private String status;
    
    private String checkoutUrl; // PayOS checkout URL
    private String qrCode; // QR code for payment
    
    private String gatewayTransactionId;
    
    private LocalDateTime paidAt;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
}

