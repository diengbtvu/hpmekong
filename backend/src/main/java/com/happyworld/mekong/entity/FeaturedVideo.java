package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "featured_videos")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeaturedVideo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(name = "title_en", length = 500)
    private String titleEn;

    @Column(name = "thumbnail_url", length = 500, nullable = false)
    private String thumbnailUrl;

    @Column(name = "video_url", length = 500, nullable = false)
    private String videoUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Enumerated(EnumType.STRING)
    @Column(name = "video_platform", nullable = false)
    private VideoPlatform videoPlatform = VideoPlatform.YOUTUBE;

    @Column(name = "video_id")
    private String videoId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VideoType type = VideoType.OTHER;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    private String author;

    @Column(name = "published_date")
    private LocalDate publishedDate;

    public enum VideoPlatform {
        YOUTUBE, VIMEO, EXTERNAL, SELF_HOSTED
    }

    public enum VideoType {
        INTRODUCTION, TUTORIAL, TESTIMONIAL, EVENT, NEWS, OTHER
    }

    public void incrementViewCount() {
        this.viewCount = (this.viewCount == null ? 0 : this.viewCount) + 1;
    }
}

