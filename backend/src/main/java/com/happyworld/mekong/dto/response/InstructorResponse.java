package com.happyworld.mekong.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorResponse {
    private Long id;
    private String name;
    private String bio;
    private String avatarUrl;
    private String expertise;
    private Integer yearsExperience;
    private String email;
    private String phone;
    private String linkedinUrl;
    private String facebookUrl;
    private Integer totalStudents;
    private Integer totalCourses;
    private Double averageRating;
    private Boolean isActive;
}

