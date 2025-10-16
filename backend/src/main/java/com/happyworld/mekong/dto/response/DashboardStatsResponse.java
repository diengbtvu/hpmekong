package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    // Users
    private Long totalUsers;
    private Long newUsersThisMonth;
    private Long activeUsers;
    
    // Courses
    private Long totalCourses;
    private Long publishedCourses;
    private Long draftCourses;
    
    // Enrollments
    private Long totalEnrollments;
    private Long activeEnrollments;
    private Long completedEnrollments;
    
    // Revenue
    private BigDecimal totalRevenue;
    private BigDecimal revenueThisMonth;
    private BigDecimal revenueToday;
    
    // Jobs
    private Long totalJobs;
    private Long activeJobs;
    private Long totalApplications;
    
    // Posts
    private Long totalPosts;
    private Long publishedPosts;
    
    // Growth stats
    private Map<String, Object> userGrowth;
    private Map<String, Object> revenueGrowth;
    private Map<String, Object> enrollmentGrowth;
}

