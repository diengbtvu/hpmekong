-- =============================================
-- Create CMS Tables
-- Version: 7.0
-- Description: Content Management System
-- =============================================

-- Table: post_categories
CREATE TABLE post_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id BIGINT NULL,
    color VARCHAR(7),
    icon VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES post_categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Post categories';

-- Table: posts
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    
    -- Media
    featured_image_url VARCHAR(500),
    gallery_images TEXT COMMENT 'JSON array',
    
    -- Organization
    category_id BIGINT,
    author_id BIGINT NOT NULL,
    
    -- Status
    status ENUM('draft', 'pending_review', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    
    -- Stats
    view_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Dates
    published_at TIMESTAMP NULL,
    scheduled_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (category_id) REFERENCES post_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id),
    
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id),
    INDEX idx_status (status),
    INDEX idx_published (published_at),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Blog posts and news';

-- Table: tags
CREATE TABLE tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    usage_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Tags for posts';

-- Table: post_tags
CREATE TABLE post_tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_post_tag (post_id, tag_id),
    INDEX idx_post (post_id),
    INDEX idx_tag (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Post-Tag mapping';

-- Table: media
CREATE TABLE media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- File Info
    filename VARCHAR(500) NOT NULL,
    original_filename VARCHAR(500),
    file_path VARCHAR(1000) NOT NULL,
    file_url VARCHAR(1000) NOT NULL,
    file_size BIGINT COMMENT 'bytes',
    mime_type VARCHAR(100),
    
    -- Type
    type ENUM('image', 'video', 'audio', 'document', 'other') NOT NULL,
    
    -- Image specific
    width INT,
    height INT,
    thumbnail_url VARCHAR(1000),
    
    -- Video specific
    duration_seconds INT,
    video_thumbnail_url VARCHAR(1000),
    
    -- Metadata
    title VARCHAR(500),
    alt_text VARCHAR(500),
    description TEXT,
    
    -- Ownership
    uploaded_by BIGINT NOT NULL,
    folder VARCHAR(255) COMMENT 'Organize in folders',
    
    -- Usage
    usage_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    
    INDEX idx_type (type),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_folder (folder)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Media library';

-- Table: galleries
CREATE TABLE galleries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    cover_image_url VARCHAR(500),
    
    -- Type
    type ENUM('photos', 'videos', 'mixed') DEFAULT 'photos',
    
    -- Stats
    total_items INT DEFAULT 0,
    view_count INT DEFAULT 0,
    
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_slug (slug),
    INDEX idx_type (type),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Photo/video galleries';

-- Table: gallery_items
CREATE TABLE gallery_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    gallery_id BIGINT NOT NULL,
    media_id BIGINT NOT NULL,
    
    title VARCHAR(500),
    description TEXT,
    order_number INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    
    INDEX idx_gallery (gallery_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Gallery items';

-- Insert default post categories
INSERT INTO post_categories (name, slug, display_order) VALUES
('Tin hoạt động', 'tin-hoat-dong', 1),
('Tin tuyển dụng', 'tin-tuyen-dung', 2),
('Tin giáo dục', 'tin-giao-duc', 3),
('Sự kiện', 'su-kien', 4),
('Thông báo', 'thong-bao', 5);

