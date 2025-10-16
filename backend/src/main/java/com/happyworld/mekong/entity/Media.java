package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "media")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String filename;

    @Column(name = "original_filename", length = 500)
    private String originalFilename;

    @Column(name = "file_path", length = 1000, nullable = false)
    private String filePath;

    @Column(name = "file_url", length = 1000, nullable = false)
    private String fileUrl;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "mime_type", length = 100)
    private String mimeType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType type;

    // Image specific
    private Integer width;
    private Integer height;

    @Column(name = "thumbnail_url", length = 1000)
    private String thumbnailUrl;

    // Video specific
    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "video_thumbnail_url", length = 1000)
    private String videoThumbnailUrl;

    @Column(length = 500)
    private String title;

    @Column(name = "alt_text", length = 500)
    private String altText;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;

    private String folder;

    @Column(name = "usage_count")
    private Integer usageCount = 0;

    public enum MediaType {
        IMAGE, VIDEO, AUDIO, DOCUMENT, OTHER
    }
}

