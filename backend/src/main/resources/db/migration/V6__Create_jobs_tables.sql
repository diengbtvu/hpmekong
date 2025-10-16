-- =============================================
-- Create Jobs Tables (Mekong Job)
-- Version: 6.0
-- Description: Job Posting & Recruitment System
-- =============================================

-- Table: companies
CREATE TABLE companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Company Info
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    
    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(500),
    
    -- Address
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    
    -- Media
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    
    -- Company Details
    industry VARCHAR(255) COMMENT 'Industry sector',
    company_size VARCHAR(50) COMMENT '1-10, 11-50, 51-200, 201-500, 500+',
    founded_year INT,
    
    -- Ownership
    owner_id BIGINT COMMENT 'User with EMPLOYER role',
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Stats
    total_jobs INT DEFAULT 0,
    total_applications INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(id),
    
    INDEX idx_slug (slug),
    INDEX idx_owner (owner_id),
    INDEX idx_city (city),
    INDEX idx_verified (is_verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Companies';

-- Table: jobs
CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    posted_by BIGINT NOT NULL,
    
    -- Job Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description LONGTEXT,
    requirements TEXT COMMENT 'JSON array',
    benefits TEXT COMMENT 'JSON array',
    
    -- Job Details
    job_type ENUM('full_time', 'part_time', 'contract', 'internship', 'freelance'),
    level VARCHAR(100) COMMENT 'entry, junior, senior, manager, director',
    experience_years VARCHAR(50) COMMENT '0-1, 1-3, 3-5, 5+',
    
    -- Location
    location TEXT COMMENT 'Multiple locations - JSON array',
    city VARCHAR(100),
    district VARCHAR(100),
    is_remote BOOLEAN DEFAULT FALSE,
    
    -- Salary
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    salary_currency VARCHAR(10) DEFAULT 'VND',
    salary_period ENUM('monthly', 'yearly', 'hourly') DEFAULT 'monthly',
    is_salary_negotiable BOOLEAN DEFAULT FALSE,
    show_salary BOOLEAN DEFAULT TRUE,
    
    -- Application
    application_method ENUM('internal', 'external', 'email'),
    application_email VARCHAR(255),
    application_url VARCHAR(500),
    
    -- Skills required (JSON array)
    skills_required TEXT,
    
    -- Status
    status ENUM('draft', 'active', 'paused', 'closed', 'expired') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    
    -- Stats
    view_count INT DEFAULT 0,
    application_count INT DEFAULT 0,
    
    -- Dates
    published_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (posted_by) REFERENCES users(id),
    
    INDEX idx_slug (slug),
    INDEX idx_company (company_id),
    INDEX idx_city (city),
    INDEX idx_status (status),
    INDEX idx_published (published_at),
    FULLTEXT idx_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Job postings';

-- Table: resumes
CREATE TABLE resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- CV Info
    title VARCHAR(500) NOT NULL COMMENT 'CV Marketing Manager, CV Developer',
    
    -- Personal (can override profile)
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    
    -- Professional
    headline VARCHAR(500),
    summary TEXT,
    objective TEXT,
    
    -- Experience (JSON array)
    work_experience TEXT,
    
    -- Education (JSON array)
    education TEXT,
    
    -- Skills (JSON array)
    skills TEXT,
    
    -- Certifications (JSON array)
    certifications TEXT,
    
    -- Languages (JSON array)
    languages TEXT,
    
    -- References (JSON array)
    references TEXT,
    
    -- File
    cv_file_url VARCHAR(500) COMMENT 'PDF upload',
    
    -- Preferences
    job_preferences TEXT COMMENT 'JSON: desired position, salary, location',
    
    -- Privacy
    is_public BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User resumes/CVs';

-- Table: job_applications
CREATE TABLE job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    resume_id BIGINT,
    
    -- Application Info
    cover_letter TEXT,
    expected_salary DECIMAL(12,2),
    available_from DATE,
    
    -- Attachments (JSON array)
    attachments TEXT,
    
    -- Status
    status ENUM('pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn') DEFAULT 'pending',
    
    -- Employer actions
    viewed_at TIMESTAMP NULL,
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP NULL,
    notes TEXT COMMENT 'Internal notes from employer',
    
    -- Interview
    interview_scheduled_at TIMESTAMP NULL,
    interview_location TEXT,
    interview_notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE SET NULL,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_application (job_id, user_id),
    INDEX idx_job (job_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Job applications';

