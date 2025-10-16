package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_categories")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostCategory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private PostCategory parent;

    private String color;
    private String icon;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;
}

