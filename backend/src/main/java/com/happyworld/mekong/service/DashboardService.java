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

        LocalDateTime now = LocalDateTime.now();
        
        LocalDateTime startOfMonth = now
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);

        LocalDateTime startOfDay = now
                .withHour(0)
                .withMinute(0)
                .withSecond(0);
        
        LocalDateTime startOfLastMonth = startOfMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfMonth.minusSeconds(1);

        // Current stats
        long totalUsers = userRepository.count();
        long totalCourses = courseRepository.count();
        long totalEnrollments = enrollmentRepository.count();
        BigDecimal totalRevenue = paymentRepository.sumAmountByStatus(Payment.PaymentStatus.COMPLETED);
        
        // Last month stats
        long totalUsersLastMonth = userRepository.countByCreatedAtBefore(startOfMonth);
        long totalCoursesLastMonth = courseRepository.countByCreatedAtBefore(startOfMonth);
        long totalEnrollmentsLastMonth = enrollmentRepository.countByCreatedAtBefore(startOfMonth);
        BigDecimal totalRevenueLastMonth = paymentRepository.sumAmountByStatusAndCreatedAtBefore(
                Payment.PaymentStatus.COMPLETED, startOfMonth);
        
        // Calculate growth percentages
        Double userGrowthPercent = calculateGrowthPercent(totalUsersLastMonth, totalUsers);
        Double courseGrowthPercent = calculateGrowthPercent(totalCoursesLastMonth, totalCourses);
        Double enrollmentGrowthPercent = calculateGrowthPercent(totalEnrollmentsLastMonth, totalEnrollments);
        Double revenueGrowthPercent = calculateGrowthPercent(
                totalRevenueLastMonth != null ? totalRevenueLastMonth.doubleValue() : 0.0,
                totalRevenue != null ? totalRevenue.doubleValue() : 0.0
        );

        return DashboardStatsResponse.builder()
                // Users
                .totalUsers(totalUsers)
                .newUsersThisMonth(userRepository.countByCreatedAtAfter(startOfMonth))
                .totalUsersLastMonth(totalUsersLastMonth)
                .userGrowthPercent(userGrowthPercent)
                
                // Courses
                .totalCourses(totalCourses)
                .publishedCourses(courseRepository.countByStatus(Course.CourseStatus.PUBLISHED))
                .draftCourses(courseRepository.countByStatus(Course.CourseStatus.DRAFT))
                .totalCoursesLastMonth(totalCoursesLastMonth)
                .courseGrowthPercent(courseGrowthPercent)
                
                // Enrollments
                .totalEnrollments(totalEnrollments)
                .activeEnrollments(enrollmentRepository.countByStatus(Enrollment.EnrollmentStatus.ACTIVE))
                .completedEnrollments(enrollmentRepository.countByStatus(Enrollment.EnrollmentStatus.COMPLETED))
                .totalEnrollmentsLastMonth(totalEnrollmentsLastMonth)
                .enrollmentGrowthPercent(enrollmentGrowthPercent)
                
                // Revenue
                .totalRevenue(totalRevenue)
                .revenueThisMonth(paymentRepository.sumAmountByStatusAndCreatedAtAfter(
                        Payment.PaymentStatus.COMPLETED, startOfMonth))
                .revenueToday(paymentRepository.sumAmountByStatusAndCreatedAtAfter(
                        Payment.PaymentStatus.COMPLETED, startOfDay))
                .totalRevenueLastMonth(totalRevenueLastMonth)
                .revenueGrowthPercent(revenueGrowthPercent)
                
                .build();
    }
    
    private Double calculateGrowthPercent(long oldValue, long newValue) {
        if (oldValue == 0) {
            return newValue > 0 ? 100.0 : 0.0;
        }
        return ((double) (newValue - oldValue) / oldValue) * 100;
    }
    
    private Double calculateGrowthPercent(double oldValue, double newValue) {
        if (oldValue == 0) {
            return newValue > 0 ? 100.0 : 0.0;
        }
        return ((newValue - oldValue) / oldValue) * 100;
    }
}

