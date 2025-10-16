package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "profiles")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    // Personal Info
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    // Contact
    @Column(columnDefinition = "TEXT")
    private String address;

    private String city;
    private String district;
    private String ward;
    private String country = "Vietnam";

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    // Professional
    @Column(name = "job_title")
    private String jobTitle;

    private String company;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 500)
    private String headline;

    @Column(length = 500)
    private String website;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(name = "facebook_url", length = 500)
    private String facebookUrl;

    // Education
    @Column(name = "education_level", length = 50)
    private String educationLevel;

    private String school;
    private String major;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    // Preferences
    @Column(name = "preferred_language", length = 10)
    private String preferredLanguage = "vi";

    @Column(length = 50)
    private String timezone = "Asia/Ho_Chi_Minh";

    // Metadata
    @Column(columnDefinition = "JSON")
    private String metadata;

    public enum Gender {
        MALE, FEMALE, OTHER
    }
}

