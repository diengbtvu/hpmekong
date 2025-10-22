package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private CourseModule module;
    
    // Note: Database has course_id column, but we'll derive it from module.course
    @Column(name = "course_id", nullable = false, insertable = true, updatable = true)
    private Long courseId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LessonType type = LessonType.VIDEO;

    @Column(name = "content_url", length = 1000)
    private String contentUrl; // Video URL, document URL, etc.

    @Column(name = "text_content", columnDefinition = "LONGTEXT")
    private String textContent; // For text-based lessons

    @Column(name = "duration_minutes")
    private Integer durationMinutes = 0;

    @Column(name = "order_number")
    private Integer orderNumber = 0;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_preview")
    private Boolean isPreview = false;

    @Column(name = "is_free")
    private Boolean isFree = false;

    @Column(name = "is_required")
    private Boolean isRequired = true;

    @Column(name = "is_published")
    private Boolean isPublished = true;

    @Column(columnDefinition = "TEXT")
    private String resources; // Additional resources/materials

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section; // Optional: for legacy support

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", length = 50)
    private ContentType contentType; // Legacy field for compatibility

    public enum LessonType {
        VIDEO, DOCUMENT, QUIZ, ASSIGNMENT, LIVE_SESSION
    }

    public enum ContentType {
        video, text, quiz, assignment, file, live_session
    }
}
