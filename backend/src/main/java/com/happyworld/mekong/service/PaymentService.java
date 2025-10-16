package com.happyworld.mekong.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.happyworld.mekong.dto.request.PaymentCreateRequest;
import com.happyworld.mekong.dto.response.PaymentResponse;
import com.happyworld.mekong.entity.Course;
import com.happyworld.mekong.entity.Payment;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.exception.BadRequestException;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.CourseRepository;
import com.happyworld.mekong.repository.PaymentRepository;
import com.happyworld.mekong.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final PayOS payOS;
    private final ObjectMapper objectMapper;

    @Value("${payos.return-url}")
    private String returnUrl;

    @Value("${payos.cancel-url}")
    private String cancelUrl;

    @Transactional
    public PaymentResponse createPayment(Long userId, PaymentCreateRequest request) {
        log.info("Creating payment for user {}: type={}, amount={}", 
                userId, request.getPaymentType(), request.getAmount());

        // Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Validate payment type and get reference
        String description = validateAndGetDescription(request);

        // Generate payment code
        String paymentCode = generatePaymentCode();

        // Create payment record
        Payment payment = Payment.builder()
                .user(user)
                .paymentCode(paymentCode)
                .amount(request.getAmount())
                .currency("VND")
                .paymentMethod(Payment.PaymentMethod.PAYOS)
                .paymentType(Payment.PaymentType.valueOf(request.getPaymentType().toUpperCase()))
                .referenceType(getReferenceType(request.getPaymentType()))
                .referenceId(request.getReferenceId())
                .status(Payment.PaymentStatus.PENDING)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        // Create PayOS payment link
        try {
            long orderCode = savedPayment.getId();
            int amount = savedPayment.getAmount().intValue();

            ItemData item = ItemData.builder()
                    .name(description)
                    .quantity(1)
                    .price(amount)
                    .build();

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderCode)
                    .amount(amount)
                    .description(description)
                    .returnUrl(returnUrl)
                    .cancelUrl(cancelUrl)
                    .items(List.of(item))
                    .build();

            CheckoutResponseData checkoutResponse = payOS.createPaymentLink(paymentData);

            // Update payment with checkout URL
            savedPayment.setMetadata(objectMapper.writeValueAsString(checkoutResponse));
            paymentRepository.save(savedPayment);

            log.info("PayOS payment link created: orderCode={}, checkoutUrl={}", 
                    orderCode, checkoutResponse.getCheckoutUrl());

            return PaymentResponse.builder()
                    .id(savedPayment.getId())
                    .paymentCode(savedPayment.getPaymentCode())
                    .amount(savedPayment.getAmount())
                    .currency(savedPayment.getCurrency())
                    .paymentMethod(savedPayment.getPaymentMethod().name())
                    .paymentType(savedPayment.getPaymentType().name())
                    .status(savedPayment.getStatus().name())
                    .checkoutUrl(checkoutResponse.getCheckoutUrl())
                    .qrCode(checkoutResponse.getQrCode())
                    .expiresAt(savedPayment.getExpiresAt())
                    .createdAt(savedPayment.getCreatedAt())
                    .build();

        } catch (Exception e) {
            log.error("Failed to create PayOS payment link", e);
            
            savedPayment.setStatus(Payment.PaymentStatus.FAILED);
            paymentRepository.save(savedPayment);
            
            throw new BadRequestException("Tạo link thanh toán thất bại: " + e.getMessage());
        }
    }

    @Transactional
    public Payment handlePaymentWebhook(String webhookData) {
        log.info("Processing PayOS webhook");

        try {
            // Parse webhook data
            var webhookType = objectMapper.readTree(webhookData);
            long orderCode = webhookType.get("data").get("orderCode").asLong();
            String code = webhookType.get("code").asText();

            Payment payment = paymentRepository.findById(orderCode)
                    .orElseThrow(() -> new ResourceNotFoundException("Payment", "orderCode", orderCode));

            if ("00".equals(code)) {
                // Payment successful
                payment.setStatus(Payment.PaymentStatus.COMPLETED);
                payment.setPaidAt(LocalDateTime.now());
                payment.setGatewayTransactionId(
                        webhookType.get("data").get("transactionDateTime").asText()
                );
                payment.setGatewayResponse(webhookData);

                log.info("Payment completed: {}", payment.getPaymentCode());

                // TODO: Trigger enrollment activation

            } else {
                // Payment failed
                payment.setStatus(Payment.PaymentStatus.FAILED);
                payment.setGatewayResponse(webhookData);
                
                log.warn("Payment failed: {}", payment.getPaymentCode());
            }

            return paymentRepository.save(payment);

        } catch (Exception e) {
            log.error("Error processing PayOS webhook", e);
            throw new BadRequestException("Xử lý webhook thất bại");
        }
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByCode(String paymentCode) {
        Payment payment = paymentRepository.findByPaymentCode(paymentCode)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "code", paymentCode));

        return mapToPaymentResponse(payment);
    }

    private String validateAndGetDescription(PaymentCreateRequest request) {
        String type = request.getPaymentType().toLowerCase();
        
        switch (type) {
            case "course_enrollment":
                Course course = courseRepository.findById(request.getReferenceId())
                        .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getReferenceId()));
                return "Thanh toán khóa học: " + course.getTitle();
                
            case "job_posting":
                return "Thanh toán đăng tin tuyển dụng";
                
            case "subscription":
                return "Thanh toán gói đăng ký";
                
            default:
                return request.getDescription() != null ? request.getDescription() : "Thanh toán Happy World Mekong";
        }
    }

    private String getReferenceType(String paymentType) {
        String type = paymentType.toLowerCase();
        switch (type) {
            case "course_enrollment": return "course";
            case "job_posting": return "job";
            case "subscription": return "subscription";
            default: return "other";
        }
    }

    private String generatePaymentCode() {
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uuid = java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "MK-PAY-" + date + "-" + uuid;
    }

    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .paymentCode(payment.getPaymentCode())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .paymentMethod(payment.getPaymentMethod().name())
                .paymentType(payment.getPaymentType().name())
                .status(payment.getStatus().name())
                .gatewayTransactionId(payment.getGatewayTransactionId())
                .paidAt(payment.getPaidAt())
                .expiresAt(payment.getExpiresAt())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}

