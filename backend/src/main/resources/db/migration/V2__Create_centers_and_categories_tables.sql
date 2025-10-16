-- =============================================
-- Create Centers and Categories Tables
-- Version: 2.0
-- Description: Organization structure
-- =============================================

-- Table: centers (9 centers in ecosystem)
CREATE TABLE centers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    
    -- Brand
    tagline VARCHAR(500),
    description TEXT,
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    primary_color VARCHAR(7) COMMENT 'Hex color',
    
    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(500),
    
    -- Manager
    manager_id BIGINT COMMENT 'User with CENTER_MANAGER role',
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='9 Centers in Happy World Mekong ecosystem';

-- Table: categories (Course categories)
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id BIGINT NULL COMMENT 'Parent category for hierarchy',
    icon VARCHAR(255),
    color VARCHAR(7),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id),
    INDEX idx_active (is_active),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Course categories';

-- Insert 9 centers
INSERT INTO centers (name, slug, tagline, primary_color, display_order) VALUES
('Mekong Skills Pro', 'mekong-skills-pro', 'Đào tạo kỹ năng chuyên sâu', '#0057B8', 1),
('Mekong Career Guide', 'mekong-career-guide', 'Hướng nghiệp online', '#FF8C00', 2),
('Mekong Boss', 'mekong-boss', 'Doanh nhân & Khởi nghiệp', '#D4AF37', 3),
('Mekong Teen', 'mekong-teen', 'Giáo dục học sinh toàn diện', '#E91E63', 4),
('Mekong Book', 'mekong-book', 'Xuất bản sách & tài liệu', '#E53935', 5),
('Mekong Job', 'mekong-job', 'Kết nối việc làm', '#3E8E41', 6),
('Mekong Space', 'mekong-space', 'Coworking & Learning Space', '#8D6E63', 7),
('Mekong Agri Academy', 'mekong-agri-academy', 'Đào tạo nông nghiệp công nghệ cao', '#8BC34A', 8),
('Mekong Innovation Hub', 'mekong-innovation-hub', 'Trung tâm đổi mới sáng tạo', '#0057B8', 9);

-- Insert sample categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Công nghệ thông tin', 'cong-nghe-thong-tin', 'Lập trình, AI, Data Science', 1),
('Marketing', 'marketing', 'Digital Marketing, SEO, Social Media', 2),
('Kinh doanh', 'kinh-doanh', 'Quản trị, Sales, Khởi nghiệp', 3),
('Kỹ năng mềm', 'ky-nang-mem', 'Giao tiếp, Lãnh đạo, Quản lý thời gian', 4),
('Ngoại ngữ', 'ngoai-ngu', 'Tiếng Anh, Tiếng Trung, Tiếng Nhật', 5),
('Thiết kế', 'thiet-ke', 'Graphic Design, UI/UX, Video', 6),
('Nông nghiệp', 'nong-nghiep', 'Nông nghiệp công nghệ cao', 7);

