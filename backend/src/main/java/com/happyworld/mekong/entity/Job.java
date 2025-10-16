package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by", nullable = false)
    private User postedBy;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(length = 500, unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String requirements; // JSON array

    @Column(columnDefinition = "TEXT")
    private String benefits; // JSON array

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;

    @Column(length = 100)
    private String level;

    @Column(name = "experience_years", length = 50)
    private String experienceYears;

    @Column(columnDefinition = "TEXT")
    private String location; // JSON array

    private String city;
    private String district;

    @Column(name = "is_remote")
    private Boolean isRemote = false;

    @Column(name = "salary_min", precision = 12, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 12, scale = 2)
    private BigDecimal salaryMax;

    @Column(name = "salary_currency", length = 10)
    private String salaryCurrency = "VND";

    @Enumerated(EnumType.STRING)
    @Column(name = "salary_period")
    private SalaryPeriod salaryPeriod = SalaryPeriod.MONTHLY;

    @Column(name = "is_salary_negotiable")
    private Boolean isSalaryNegotiable = false;

    @Column(name = "show_salary")
    private Boolean showSalary = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_method")
    private ApplicationMethod applicationMethod = ApplicationMethod.INTERNAL;

    @Column(name = "application_email")
    private String applicationEmail;

    @Column(name = "application_url", length = 500)
    private String applicationUrl;

    @Column(name = "skills_required", columnDefinition = "TEXT")
    private String skillsRequired; // JSON array

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private JobStatus status = JobStatus.DRAFT;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_urgent")
    private Boolean isUrgent = false;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "application_count")
    private Integer applicationCount = 0;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "closed_at")
    private LocalDateTime closedAt;

    public enum JobType {
        FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE
    }

    public enum SalaryPeriod {
        MONTHLY, YEARLY, HOURLY
    }

    public enum ApplicationMethod {
        INTERNAL, EXTERNAL, EMAIL
    }

    public enum JobStatus {
        DRAFT, ACTIVE, PAUSED, CLOSED, EXPIRED
    }
}

