package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String name;

    @Column(length = 500, unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String email;
    private String phone;
    private String website;

    @Column(columnDefinition = "TEXT")
    private String address;
    private String city;
    private String district;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    private String industry;

    @Column(name = "company_size", length = 50)
    private String companySize;

    @Column(name = "founded_year")
    private Integer foundedYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "total_jobs")
    private Integer totalJobs = 0;

    @Column(name = "total_applications")
    private Integer totalApplications = 0;
}

