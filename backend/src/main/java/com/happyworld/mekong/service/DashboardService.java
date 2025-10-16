package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.response.DashboardStatsResponse;
import com.happyworld.mekong.entity.*;
import com.happyworld.mekong.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PaymentRepository paymentRepository;
    private final JobRepository jobRepository;
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getOverviewStats() {
        log.info("Getting dashboard overview stats");

        LocalDateTime startOfMonth = LocalDateTime.now()
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);

        LocalDateTime startOfDay = LocalDateTime.now()
                .withHour(0)
                .withMinute(0)
                .withSecond(0);

        return DashboardStatsResponse.builder()
                // Users
                .totalUsers(userRepository.count())
                .newUsersThisMonth(userRepository.countByCreatedAtAfter(startOfMonth))
                
                // Courses
                .totalCourses(courseRepository.count())
                .publishedCourses(courseRepository.countByStatus(Course.CourseStatus.PUBLISHED))
                .draftCourses(courseRepository.countByStatus(Course.CourseStatus.DRAFT))
                
                // Enrollments
                .totalEnrollments(enrollmentRepository.count())
                .activeEnrollments(enrollmentRepository.countByStatus(Enrollment.EnrollmentStatus.ACTIVE))
                .completedEnrollments(enrollmentRepository.countByStatus(Enrollment.EnrollmentStatus.COMPLETED))
                
                // Revenue
                .totalRevenue(paymentRepository.sumAmountByStatus(Payment.PaymentStatus.COMPLETED))
                .revenueThisMonth(paymentRepository.sumAmountByStatusAndCreatedAtAfter(
                        Payment.PaymentStatus.COMPLETED, startOfMonth))
                .revenueToday(paymentRepository.sumAmountByStatusAndCreatedAtAfter(
                        Payment.PaymentStatus.COMPLETED, startOfDay))
                
                .build();
    }
}

