package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.PaymentCreateRequest;
import com.happyworld.mekong.dto.response.PaymentResponse;
import com.happyworld.mekong.entity.Payment;
import com.happyworld.mekong.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @Valid @RequestBody PaymentCreateRequest request,
            Authentication authentication) {
        
        Long userId = 1L; // TODO: Get from authentication
        log.info("POST /api/v1/payments/create - User: {}, Type: {}", userId, request.getPaymentType());
        
        PaymentResponse payment = paymentService.createPayment(userId, request);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(payment, "Tạo link thanh toán thành công"));
    }

    @GetMapping("/{paymentCode}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPayment(@PathVariable String paymentCode) {
        log.info("GET /api/v1/payments/{}", paymentCode);
        
        PaymentResponse payment = paymentService.getPaymentByCode(paymentCode);
        
        return ResponseEntity.ok(ApiResponse.success(payment));
    }

    @PostMapping("/webhook/payos")
    public ResponseEntity<String> handlePayOSWebhook(@RequestBody String webhookData) {
        log.info("POST /api/v1/payments/webhook/payos");
        
        try {
            Payment payment = paymentService.handlePaymentWebhook(webhookData);
            
            if (payment.getStatus() == Payment.PaymentStatus.COMPLETED) {
                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.ok("failed");
            }
            
        } catch (Exception e) {
            log.error("Error handling PayOS webhook", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
        }
    }
}

