-- =============================================
-- Create Users and Roles Tables
-- Version: 1.0
-- Description: Authentication & User Management
-- =============================================

-- Table: roles
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'SUPER_ADMIN, ADMIN, STUDENT, etc.',
    display_name VARCHAR(100),
    description TEXT,
    level INT DEFAULT 0 COMMENT 'Priority level (higher = more privilege)',
    is_system_role BOOLEAN DEFAULT FALSE COMMENT 'System roles cannot be deleted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User roles definition';

-- Table: users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'BCrypt hashed',
    phone VARCHAR(20),
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    
    -- Security
    failed_login_attempts INT DEFAULT 0,
    last_login_at TIMESTAMP NULL,
    last_login_ip VARCHAR(45),
    password_changed_at TIMESTAMP NULL,
    
    -- 2FA
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    
    -- OAuth
    oauth_provider VARCHAR(50) COMMENT 'google, facebook, zalo',
    oauth_id VARCHAR(255),
    
    -- Verification
    email_verification_token VARCHAR(255),
    email_verified_at TIMESTAMP NULL,
    
    -- Password Reset
    password_reset_token VARCHAR(255),
    password_reset_expires_at TIMESTAMP NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL COMMENT 'Soft delete',
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_phone (phone),
    INDEX idx_oauth (oauth_provider, oauth_id),
    INDEX idx_active (is_active, is_verified),
    INDEX idx_verification_token (email_verification_token),
    INDEX idx_reset_token (password_reset_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User accounts';

-- Table: user_roles
CREATE TABLE user_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_by BIGINT COMMENT 'Admin who assigned this role',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_user_role (user_id, role_id),
    INDEX idx_user_id (user_id),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User-Role mapping';

-- Table: permissions
CREATE TABLE permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE COMMENT 'user.create, course.edit, etc.',
    resource VARCHAR(50) COMMENT 'user, course, post',
    action VARCHAR(50) COMMENT 'create, read, update, delete',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_resource_action (resource, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='System permissions';

-- Table: role_permissions
CREATE TABLE role_permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_role_permission (role_id, permission_id),
    INDEX idx_role_id (role_id),
    INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Role-Permission mapping';

-- Table: profiles
CREATE TABLE profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    
    -- Personal Info
    full_name VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    avatar_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    
    -- Contact
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    ward VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Vietnam',
    postal_code VARCHAR(20),
    
    -- Professional (for INSTRUCTOR, EMPLOYER)
    job_title VARCHAR(255),
    company VARCHAR(255),
    bio TEXT,
    headline VARCHAR(500),
    website VARCHAR(500),
    linkedin_url VARCHAR(500),
    facebook_url VARCHAR(500),
    
    -- Education (for STUDENT)
    education_level VARCHAR(50) COMMENT 'high_school, bachelor, master, phd',
    school VARCHAR(255),
    major VARCHAR(255),
    graduation_year INT,
    
    -- Preferences
    preferred_language VARCHAR(10) DEFAULT 'vi',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    
    -- Metadata
    metadata JSON COMMENT 'Additional custom fields',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_full_name (full_name),
    INDEX idx_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User profiles';

-- Insert default roles
INSERT INTO roles (name, display_name, level, is_system_role) VALUES
('SUPER_ADMIN', 'Quản trị viên cấp cao', 100, TRUE),
('ADMIN', 'Quản trị viên', 90, TRUE),
('CENTER_MANAGER', 'Quản lý trung tâm', 70, TRUE),
('INSTRUCTOR', 'Giảng viên', 50, TRUE),
('STUDENT', 'Học viên', 30, TRUE),
('PARTNER', 'Đối tác', 20, TRUE),
('EMPLOYER', 'Nhà tuyển dụng', 20, TRUE),
('USER', 'Người dùng', 10, TRUE);

