-- =============================================
-- Create Courses Tables
-- Version: 3.0
-- Description: Course Management System
-- =============================================

-- Table: instructors
CREATE TABLE instructors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    
    -- Professional Info
    title VARCHAR(255) COMMENT 'Tiến sĩ, Thạc sĩ, Giảng viên',
    expertise TEXT COMMENT 'JSON array: [Marketing, Sales, Leadership]',
    years_of_experience INT,
    
    -- Bio
    short_bio VARCHAR(500),
    full_bio TEXT,
    achievements TEXT COMMENT 'JSON array of achievements',
    
    -- Media
    video_intro_url VARCHAR(500),
    
    -- Stats
    total_students INT DEFAULT 0,
    total_courses INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    
    -- Status
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Social
    linkedin_url VARCHAR(500),
    facebook_url VARCHAR(500),
    youtube_url VARCHAR(500),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active),
    INDEX idx_rating (average_rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Instructor profiles';

-- Table: courses
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    subtitle VARCHAR(500),
    description TEXT,
    
    -- Content
    what_you_will_learn TEXT COMMENT 'JSON array',
    requirements TEXT COMMENT 'JSON array',
    target_audience TEXT COMMENT 'JSON array',
    
    -- Organization
    center_id BIGINT NOT NULL,
    category_id BIGINT,
    instructor_id BIGINT,
    
    -- Media
    thumbnail_url VARCHAR(500),
    preview_video_url VARCHAR(500),
    
    -- Pricing
    price DECIMAL(10,2) DEFAULT 0.00,
    original_price DECIMAL(10,2),
    discount_percentage INT DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    
    -- Course Info
    level ENUM('beginner', 'intermediate', 'advanced', 'all_levels') DEFAULT 'all_levels',
    language VARCHAR(10) DEFAULT 'vi',
    duration_hours INT COMMENT 'Total hours',
    total_lessons INT DEFAULT 0,
    
    -- Delivery
    delivery_mode ENUM('online', 'offline', 'hybrid') DEFAULT 'online',
    
    -- Status
    status ENUM('draft', 'pending_review', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    
    -- Stats
    total_students INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_views INT DEFAULT 0,
    
    -- Certificate
    has_certificate BOOLEAN DEFAULT TRUE,
    certificate_template_id BIGINT,
    
    -- Dates
    published_at TIMESTAMP NULL,
    start_date DATE,
    end_date DATE,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (center_id) REFERENCES centers(id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL,
    
    INDEX idx_slug (slug),
    INDEX idx_center (center_id),
    INDEX idx_category (category_id),
    INDEX idx_instructor (instructor_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_price (price),
    INDEX idx_rating (average_rating),
    INDEX idx_published (published_at),
    FULLTEXT idx_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Courses';

-- Table: sections (Modules in courses)
CREATE TABLE sections (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_number INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Course sections/modules';

-- Table: lessons
CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    section_id BIGINT COMMENT 'Group lessons by sections',
    
    -- Info
    title VARCHAR(500) NOT NULL,
    description TEXT,
    
    -- Content
    content_type ENUM('video', 'text', 'quiz', 'assignment', 'file', 'live_session'),
    content_url VARCHAR(1000) COMMENT 'Video URL, file URL, etc.',
    text_content LONGTEXT COMMENT 'HTML content for text lessons',
    duration_minutes INT DEFAULT 0,
    
    -- Organization
    order_number INT DEFAULT 0,
    
    -- Access
    is_preview BOOLEAN DEFAULT FALSE COMMENT 'Free preview',
    is_required BOOLEAN DEFAULT TRUE,
    
    -- Resources
    resources TEXT COMMENT 'JSON array of downloadable resources',
    
    -- Status
    is_published BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL,
    INDEX idx_course (course_id),
    INDEX idx_section (section_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Course lessons';

-- Table: reviews
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    enrollment_id BIGINT,
    
    -- Rating
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Review
    title VARCHAR(255),
    comment TEXT,
    
    -- Helpful votes
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    
    -- Moderation
    is_approved BOOLEAN DEFAULT TRUE,
    is_reported BOOLEAN DEFAULT FALSE,
    moderated_by BIGINT,
    moderated_at TIMESTAMP NULL,
    
    -- Response from instructor/admin
    response TEXT,
    response_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_review (course_id, user_id),
    INDEX idx_course (course_id),
    INDEX idx_user (user_id),
    INDEX idx_rating (rating),
    INDEX idx_approved (is_approved)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Course reviews';

