package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "instructors")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instructor extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private String title; // Tiến sĩ, Thạc sĩ, etc.

    @Column(columnDefinition = "TEXT")
    private String expertise; // JSON array

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "short_bio", length = 500)
    private String shortBio;

    @Column(name = "full_bio", columnDefinition = "TEXT")
    private String fullBio;

    @Column(columnDefinition = "TEXT")
    private String achievements; // JSON array

    @Column(name = "video_intro_url", length = 500)
    private String videoIntroUrl;

    // Stats
    @Column(name = "total_students")
    private Integer totalStudents = 0;

    @Column(name = "total_courses")
    private Integer totalCourses = 0;

    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Column(name = "total_reviews")
    private Integer totalReviews = 0;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(name = "facebook_url", length = 500)
    private String facebookUrl;

    @Column(name = "youtube_url", length = 500)
    private String youtubeUrl;
}

