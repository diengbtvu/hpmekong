package com.happyworld.mekong.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.entity.Enrollment;
import com.happyworld.mekong.entity.Payment;
import com.happyworld.mekong.repository.EnrollmentRepository;
import com.happyworld.mekong.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.Webhook;
import vn.payos.type.WebhookData;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
@Slf4j
public class PayOSWebhookController {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PayOS payOS;
    private final ObjectMapper objectMapper;

    @PostMapping("/payos")
    @Transactional
    public ResponseEntity<?> handlePayOSWebhook(@RequestBody String rawBody) {
        log.info("=== PayOS Webhook Received ===");
        log.info("Raw body: {}", rawBody);
        
        try {
            // Parse webhook data
            Webhook webhook = objectMapper.readValue(rawBody, Webhook.class);
            log.info("Webhook parsed - Code: {}", webhook.getCode());
            
            // Verify webhook signature
            WebhookData webhookData = payOS.verifyPaymentWebhookData(webhook);
            log.info("Webhook verified - OrderCode: {}, Amount: {}, Description: {}", 
                    webhookData.getOrderCode(), 
                    webhookData.getAmount(), 
                    webhookData.getDescription());
            
            // Only process successful payments
            if (!"00".equals(webhook.getCode())) {
                log.warn("Payment not successful. Code: {}, Description: {}", 
                        webhook.getCode(), webhook.getDesc());
                return ResponseEntity.ok(Map.of("success", true, "message", "Payment not successful"));
            }
            
            // Get payment by ID (orderCode is our payment ID)
            Long paymentId = webhookData.getOrderCode();
            Payment payment = paymentRepository.findById(paymentId)
                    .orElseThrow(() -> new RuntimeException("Payment not found: " + paymentId));
            
            log.info("Found payment: ID={}, Code={}, CurrentStatus={}", 
                    payment.getId(), payment.getPaymentCode(), payment.getStatus());
            
            // Check if already processed (idempotency)
            if (payment.getStatus() == Payment.PaymentStatus.COMPLETED) {
                log.info("Payment already processed: {}", payment.getPaymentCode());
                return ResponseEntity.ok(Map.of("success", true, "message", "Already processed"));
            }
            
            // Update payment status
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setGatewayTransactionId(webhookData.getTransactionDateTime());
            payment.setPaidAt(LocalDateTime.now());
            payment.setGatewayResponse(rawBody);
            paymentRepository.save(payment);
            
            log.info("Payment updated to COMPLETED: {}", payment.getPaymentCode());
            
            // Activate enrollment(s) if exists
            if (payment.getReferenceType() != null && 
                "course".equalsIgnoreCase(payment.getReferenceType())) {
                
                Long userId = payment.getUser().getId();
                
                // Check if this is a multi-course payment (from cart)
                java.util.List<Long> courseIds = new java.util.ArrayList<>();
                
                // Try to get courseIds from metadata
                if (payment.getMetadata() != null) {
                    try {
                        com.fasterxml.jackson.databind.JsonNode metadataNode = objectMapper.readTree(payment.getMetadata());
                        if (metadataNode.has("courseIds")) {
                            com.fasterxml.jackson.databind.JsonNode courseIdsNode = metadataNode.get("courseIds");
                            if (courseIdsNode.isArray()) {
                                for (com.fasterxml.jackson.databind.JsonNode idNode : courseIdsNode) {
                                    courseIds.add(idNode.asLong());
                                }
                                log.info("Found {} courses in metadata for multi-course payment", courseIds.size());
                            }
                        }
                    } catch (Exception e) {
                        log.warn("Could not parse metadata for courseIds: {}", e.getMessage());
                    }
                }
                
                // If no courses in metadata, use single referenceId
                if (courseIds.isEmpty() && payment.getReferenceId() != null) {
                    courseIds.add(payment.getReferenceId());
                }
                
                log.info("Activating enrollments for userId={}, courseIds={}", userId, courseIds);
                
                int activatedCount = 0;
                for (Long courseId : courseIds) {
                    // Find enrollment
                    Enrollment enrollment = enrollmentRepository
                            .findByUserIdAndCourseId(userId, courseId)
                            .orElse(null);
                    
                    if (enrollment != null) {
                        log.info("Found enrollment: id={}, courseId={}, status={}", 
                                enrollment.getId(), courseId, enrollment.getStatus());
                        
                        // Activate enrollment if PENDING
                        if (enrollment.getStatus() == Enrollment.EnrollmentStatus.PENDING) {
                            enrollment.setStatus(Enrollment.EnrollmentStatus.ACTIVE);
                            enrollment.setStartedAt(LocalDateTime.now());
                            enrollmentRepository.save(enrollment);
                            activatedCount++;
                            
                            log.info("✅ Enrollment ACTIVATED: enrollmentId={}, userId={}, courseId={}", 
                                    enrollment.getId(), userId, courseId);
                        } else {
                            log.info("Enrollment already in status: {}", enrollment.getStatus());
                        }
                    } else {
                        log.error("❌ Enrollment NOT FOUND for userId={}, courseId={}", userId, courseId);
                    }
                }
                
                log.info("Total enrollments activated: {}/{}", activatedCount, courseIds.size());
                
            } else {
                log.warn("Skipping enrollment activation: referenceType='{}', referenceId={}", 
                        payment.getReferenceType(), payment.getReferenceId());
            }
            
            log.info("=== Webhook Processing Completed ===");
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Payment processed successfully",
                    "paymentCode", payment.getPaymentCode()
            ));
            
        } catch (Exception e) {
            log.error("Error processing PayOS webhook", e);
            log.error("Raw body that caused error: {}", rawBody);
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "Error: " + e.getMessage()
            ));
        }
    }
    
    @GetMapping("/payos/test")
    public ResponseEntity<?> testWebhook() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Webhook endpoint is working",
                "timestamp", LocalDateTime.now()
        ));
    }
}
