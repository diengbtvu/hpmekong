-- Create leaders table
CREATE TABLE IF NOT EXISTS leaders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    linkedin_url VARCHAR(500),
    facebook_url VARCHAR(500),
    twitter_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    is_featured TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME(6),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    INDEX idx_is_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional - you can remove this)
INSERT INTO leaders (full_name, position, bio, display_order, is_active, is_featured) VALUES
('Nguyễn Văn A', 'CEO & Founder', 'Founder và CEO của Happy World Mekong với hơn 15 năm kinh nghiệm trong lĩnh vực giáo dục và công nghệ.', 1, 1, 1),
('Trần Thị B', 'CTO', 'Giám đốc Công nghệ, chuyên gia về EdTech và chuyển đổi số trong giáo dục.', 2, 1, 1),
('Lê Văn C', 'COO', 'Giám đốc Điều hành, phụ trách hoạt động và phát triển hệ sinh thái giáo dục.', 3, 1, 1);
