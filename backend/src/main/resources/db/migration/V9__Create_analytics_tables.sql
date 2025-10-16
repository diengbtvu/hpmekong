-- =============================================
-- Create Analytics Tables
-- Version: 9.0
-- Description: Analytics & Logging System
-- =============================================

-- Table: analytics_events
CREATE TABLE analytics_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- User
    user_id BIGINT,
    session_id VARCHAR(255),
    
    -- Event
    event_type VARCHAR(100) NOT NULL COMMENT 'page_view, course_view, enrollment, video_watch',
    event_category VARCHAR(100),
    event_action VARCHAR(100),
    event_label VARCHAR(255),
    
    -- Resource
    resource_type VARCHAR(50) COMMENT 'course, post, job',
    resource_id BIGINT,
    
    -- Metadata
    properties JSON COMMENT 'Additional event data',
    
    -- Context
    url VARCHAR(1000),
    referrer VARCHAR(1000),
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_type VARCHAR(50) COMMENT 'desktop, mobile, tablet',
    browser VARCHAR(100),
    os VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_event (event_type),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User behavior analytics';

-- Table: audit_logs
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- User
    user_id BIGINT,
    
    -- Action
    action VARCHAR(100) NOT NULL COMMENT 'create, update, delete, login, logout',
    resource_type VARCHAR(100) NOT NULL COMMENT 'user, course, payment',
    resource_id BIGINT,
    
    -- Changes
    old_values JSON COMMENT 'Old values',
    new_values JSON COMMENT 'New values',
    
    -- Context
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Audit trail for important changes';

-- Table: system_logs
CREATE TABLE system_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Log Level
    level ENUM('DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL') NOT NULL,
    
    -- Message
    logger VARCHAR(255),
    message TEXT,
    exception TEXT COMMENT 'Stack trace if error',
    
    -- Context
    context JSON,
    user_id BIGINT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_level (level),
    INDEX idx_logger (logger),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='System logs and errors';

-- Table: refresh_tokens
CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    revoked_at TIMESTAMP NULL,
    
    device_info VARCHAR(500),
    ip_address VARCHAR(45),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_user (user_id),
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='JWT refresh tokens';

-- Table: system_settings
CREATE TABLE system_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(255) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) COMMENT 'string, number, boolean, json',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE COMMENT 'Can be accessed by non-admin',
    
    updated_by BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='System-wide settings';

