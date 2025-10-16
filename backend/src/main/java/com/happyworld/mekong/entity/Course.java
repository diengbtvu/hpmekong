package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(length = 500, unique = true, nullable = false)
    private String slug;

    @Column(length = 500)
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "what_you_will_learn", columnDefinition = "TEXT")
    private String whatYouWillLearn; // JSON array

    @Column(columnDefinition = "TEXT")
    private String requirements; // JSON array

    @Column(name = "target_audience", columnDefinition = "TEXT")
    private String targetAudience; // JSON array

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id", nullable = false)
    private Center center;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "preview_video_url", length = 500)
    private String previewVideoUrl;

    @Column(precision = 10, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "discount_percentage")
    private Integer discountPercentage = 0;

    @Column(name = "is_free")
    private Boolean isFree = false;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CourseLevel level = CourseLevel.ALL_LEVELS;

    @Column(length = 10)
    private String language = "vi";

    @Column(name = "duration_hours")
    private Integer durationHours;

    @Column(name = "total_lessons")
    private Integer totalLessons = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_mode", length = 20)
    private DeliveryMode deliveryMode = DeliveryMode.ONLINE;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CourseStatus status = CourseStatus.DRAFT;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_bestseller")
    private Boolean isBestseller = false;

    @Column(name = "total_students")
    private Integer totalStudents = 0;

    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Column(name = "total_reviews")
    private Integer totalReviews = 0;

    @Column(name = "total_views")
    private Integer totalViews = 0;

    @Column(name = "has_certificate")
    private Boolean hasCertificate = true;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;

    @Column(name = "meta_keywords", columnDefinition = "TEXT")
    private String metaKeywords;

    public enum CourseLevel {
        BEGINNER, INTERMEDIATE, ADVANCED, ALL_LEVELS
    }

    public enum DeliveryMode {
        ONLINE, OFFLINE, HYBRID
    }

    public enum CourseStatus {
        DRAFT, PENDING_REVIEW, PUBLISHED, ARCHIVED
    }
}

