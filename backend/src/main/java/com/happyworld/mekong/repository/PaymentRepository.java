package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPaymentCode(String paymentCode);

    Optional<Payment> findByGatewayTransactionId(String gatewayTransactionId);

    Page<Payment> findAllByUserId(Long userId, Pageable pageable);

    Page<Payment> findAllByUserIdAndStatus(Long userId, Payment.PaymentStatus status, Pageable pageable);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = :status")
    BigDecimal sumAmountByStatus(Payment.PaymentStatus status);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = :status AND p.createdAt >= :startDate")
    BigDecimal sumAmountByStatusAndCreatedAtAfter(Payment.PaymentStatus status, LocalDateTime startDate);

    long countByStatus(Payment.PaymentStatus status);
}

