package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EnrollmentStatus status = EnrollmentStatus.PENDING;

    @Column(name = "progress_percentage", precision = 5, scale = 2)
    private BigDecimal progressPercentage = BigDecimal.ZERO;

    @Column(name = "completed_lessons")
    private Integer completedLessons = 0;

    @Column(name = "total_lessons")
    private Integer totalLessons = 0;

    @Column(name = "certificate_issued")
    private Boolean certificateIssued = false;

    @Column(name = "certificate_issued_at")
    private LocalDateTime certificateIssuedAt;

    @Column(name = "enrolled_at")
    private LocalDateTime enrolledAt;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "amount_paid", precision = 10, scale = 2)
    private BigDecimal amountPaid = BigDecimal.ZERO;

    @Column(name = "has_reviewed")
    private Boolean hasReviewed = false;

    public enum EnrollmentStatus {
        PENDING, ACTIVE, COMPLETED, CANCELLED, EXPIRED
    }
}

