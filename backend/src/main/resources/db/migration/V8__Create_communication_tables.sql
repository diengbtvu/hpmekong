-- =============================================
-- Create Communication Tables
-- Version: 8.0
-- Description: Communication & Notification System
-- =============================================

-- Table: partners
CREATE TABLE partners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Partner Info
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    type ENUM('university', 'college', 'company', 'government', 'ngo', 'other') NOT NULL,
    description TEXT,
    
    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(500),
    address TEXT,
    city VARCHAR(100),
    
    -- Media
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    
    -- Partnership
    partnership_since DATE,
    partnership_type VARCHAR(255) COMMENT 'Training, Recruitment, Research',
    
    -- Contact Person
    contact_person_name VARCHAR(255),
    contact_person_title VARCHAR(255),
    contact_person_email VARCHAR(255),
    contact_person_phone VARCHAR(20),
    
    -- Status
    status ENUM('pending', 'active', 'inactive', 'suspended') DEFAULT 'pending',
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Owner
    user_id BIGINT COMMENT 'Link to PARTNER role user',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_slug (slug),
    INDEX idx_type (type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Partner organizations';

-- Table: contacts
CREATE TABLE contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Contact Info
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    
    -- Message
    subject VARCHAR(500),
    message TEXT NOT NULL,
    
    -- Type
    contact_type VARCHAR(100) COMMENT 'general, support, partnership, sales',
    
    -- Status
    status ENUM('new', 'read', 'replied', 'resolved', 'spam') DEFAULT 'new',
    
    -- Response
    reply_message TEXT,
    replied_by BIGINT,
    replied_at TIMESTAMP NULL,
    
    -- User (if logged in)
    user_id BIGINT,
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_status (status),
    INDEX idx_type (contact_type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Contact form submissions';

-- Table: newsletters
CREATE TABLE newsletters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    
    -- Info
    name VARCHAR(255),
    
    -- Status
    status ENUM('subscribed', 'unsubscribed', 'bounced') DEFAULT 'subscribed',
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verified_at TIMESTAMP NULL,
    
    -- Preferences
    preferences JSON COMMENT 'Interested topics, frequency',
    
    -- Dates
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    
    -- User link
    user_id BIGINT,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Newsletter subscriptions';

-- Table: notifications
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- Notification Info
    type VARCHAR(50) NOT NULL COMMENT 'enrollment, payment, certificate, message, job_application',
    title VARCHAR(500),
    message TEXT,
    
    -- Action
    action_url VARCHAR(500) COMMENT 'Link to click',
    action_text VARCHAR(100) COMMENT 'View Course, Download Certificate',
    
    -- Reference
    reference_type VARCHAR(50),
    reference_id BIGINT,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    
    -- Delivery
    sent_via ENUM('in_app', 'email', 'push', 'sms'),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User notifications';

