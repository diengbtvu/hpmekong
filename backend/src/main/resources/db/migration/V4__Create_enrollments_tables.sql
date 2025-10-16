-- =============================================
-- Create Enrollments Tables
-- Version: 4.0
-- Description: Learning Management System
-- =============================================

-- Table: enrollments
CREATE TABLE enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    
    -- Status
    status ENUM('pending', 'active', 'completed', 'cancelled', 'expired') DEFAULT 'pending',
    
    -- Progress
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    completed_lessons INT DEFAULT 0,
    total_lessons INT DEFAULT 0,
    
    -- Certificate
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_issued_at TIMESTAMP NULL,
    
    -- Dates
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL COMMENT 'For time-limited courses',
    
    -- Payment
    payment_id BIGINT,
    amount_paid DECIMAL(10,2) DEFAULT 0.00,
    
    -- Rating
    has_reviewed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id),
    INDEX idx_status (status),
    INDEX idx_enrolled (enrolled_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Course enrollments';

-- Table: lesson_progress
CREATE TABLE lesson_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    
    -- Progress
    is_completed BOOLEAN DEFAULT FALSE,
    completion_percentage INT DEFAULT 0,
    time_spent_seconds INT DEFAULT 0,
    
    -- Video progress
    last_position_seconds INT DEFAULT 0,
    
    -- Dates
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_progress (enrollment_id, lesson_id),
    INDEX idx_enrollment (enrollment_id),
    INDEX idx_lesson (lesson_id),
    INDEX idx_completed (is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Lesson learning progress';

-- Table: certificates
CREATE TABLE certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    
    -- Certificate Info
    certificate_code VARCHAR(50) NOT NULL UNIQUE COMMENT 'MK-CERT-XXXXX',
    certificate_url VARCHAR(500) COMMENT 'PDF URL',
    
    -- Verification
    is_valid BOOLEAN DEFAULT TRUE,
    verification_url VARCHAR(500),
    
    -- Dates
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL COMMENT 'NULL = never expires',
    
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    
    INDEX idx_code (certificate_code),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id),
    INDEX idx_issued (issued_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Course completion certificates';

