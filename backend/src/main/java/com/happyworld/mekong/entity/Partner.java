package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "partners")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partner extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "logo_url", length = 500, nullable = false)
    private String logoUrl;

    @Column(name = "website_url", length = 500)
    private String websiteUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PartnerType type = PartnerType.OTHER;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    public enum PartnerType {
        UNIVERSITY, CORPORATE, GOVERNMENT, NGO, STRATEGIC, OTHER
    }
}

