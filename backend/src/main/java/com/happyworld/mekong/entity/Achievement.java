package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "achievements")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(name = "title_en", length = 500)
    private String titleEn;

    @Column(name = "image_url", length = 500, nullable = false)
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "achievement_date")
    private LocalDate achievementDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AchievementType type = AchievementType.OTHER;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    public enum AchievementType {
        AWARD, CERTIFICATE, RECOGNITION, MILESTONE, OTHER
    }
}

