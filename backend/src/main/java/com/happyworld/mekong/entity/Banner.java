package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "banners")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(name = "title_en", length = 500)
    private String titleEn;

    @Column(length = 1000)
    private String subtitle;

    @Column(name = "subtitle_en", length = 1000)
    private String subtitleEn;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "image_url", length = 500, nullable = false)
    private String imageUrl;

    @Column(name = "mobile_image_url", length = 500)
    private String mobileImageUrl;

    @Column(name = "link_url", length = 500)
    private String linkUrl;

    @Column(name = "link_text", length = 255)
    private String linkText;

    @Column(name = "link_text_en", length = 255)
    private String linkTextEn;

    @Column(name = "open_in_new_tab")
    private Boolean openInNewTab = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BannerType type = BannerType.HERO;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "click_count")
    private Integer clickCount = 0;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    public enum BannerType {
        HERO, FEATURED_NEWS, PROMOTION, ANNOUNCEMENT
    }

    // Helper methods
    public boolean isScheduled() {
        LocalDateTime now = LocalDateTime.now();
        if (startDate != null && now.isBefore(startDate)) {
            return false;
        }
        if (endDate != null && now.isAfter(endDate)) {
            return false;
        }
        return true;
    }

    public void incrementViewCount() {
        this.viewCount = (this.viewCount == null ? 0 : this.viewCount) + 1;
    }

    public void incrementClickCount() {
        this.clickCount = (this.clickCount == null ? 0 : this.clickCount) + 1;
    }
}

