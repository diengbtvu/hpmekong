package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Slug is required")
    private String slug;

    private String title;

    private String bio;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    private String avatarUrl;

    private String coverImageUrl;

    private String expertise; // JSON array

    private String certifications; // JSON array

    private String education;

    private Integer yearsOfExperience;

    private Double rating;

    private Integer totalStudents;

    private Integer totalCourses;

    private String linkedinUrl;

    private String facebookUrl;

    private String twitterUrl;

    private String youtubeUrl;

    private Boolean isActive = true;

    private Boolean isFeatured = false;

    private Integer displayOrder = 0;
}

