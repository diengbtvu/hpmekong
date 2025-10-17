-- =============================================
-- Create Content Management Tables
-- Version: 10.0
-- Description: Banners, Partners, Achievements, Videos, Settings
-- =============================================

-- Table: banners
CREATE TABLE banners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    title_en VARCHAR(500),
    subtitle VARCHAR(1000),
    subtitle_en VARCHAR(1000),
    
    -- Content
    description TEXT,
    description_en TEXT,
    
    -- Media
    image_url VARCHAR(500) NOT NULL,
    mobile_image_url VARCHAR(500),
    
    -- Link
    link_url VARCHAR(500),
    link_text VARCHAR(255),
    link_text_en VARCHAR(255),
    open_in_new_tab BOOLEAN DEFAULT FALSE,
    
    -- Type
    type ENUM('hero', 'featured_news', 'promotion', 'announcement') DEFAULT 'hero',
    
    -- Display
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Schedule
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    
    -- Stats
    click_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_type (type),
    INDEX idx_order (display_order),
    INDEX idx_active (is_active),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Homepage banners and sliders';

-- Table: partners
CREATE TABLE partners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    
    -- Media
    logo_url VARCHAR(500) NOT NULL,
    
    -- Link
    website_url VARCHAR(500),
    
    -- Additional Info
    description TEXT,
    description_en TEXT,
    
    -- Type
    type ENUM('university', 'corporate', 'government', 'ngo', 'strategic', 'other') DEFAULT 'other',
    
    -- Display
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_type (type),
    INDEX idx_order (display_order),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Partner organizations';

-- Table: achievements
CREATE TABLE achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    title_en VARCHAR(500),
    
    -- Media
    image_url VARCHAR(500) NOT NULL,
    
    -- Content
    description TEXT,
    description_en TEXT,
    
    -- Date
    achievement_date DATE,
    
    -- Type
    type ENUM('award', 'certificate', 'recognition', 'milestone', 'other') DEFAULT 'other',
    
    -- Display
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_type (type),
    INDEX idx_order (display_order),
    INDEX idx_active (is_active),
    INDEX idx_date (achievement_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Company achievements and awards';

-- Table: featured_videos
CREATE TABLE featured_videos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    title_en VARCHAR(500),
    
    -- Media
    thumbnail_url VARCHAR(500) NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    
    -- Content
    description TEXT,
    description_en TEXT,
    
    -- Video Info
    duration_seconds INT,
    video_platform ENUM('youtube', 'vimeo', 'external', 'self_hosted') DEFAULT 'youtube',
    video_id VARCHAR(255) COMMENT 'YouTube/Vimeo video ID',
    
    -- Type
    type ENUM('introduction', 'tutorial', 'testimonial', 'event', 'news', 'other') DEFAULT 'other',
    
    -- Display
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Stats
    view_count INT DEFAULT 0,
    
    -- Meta
    author VARCHAR(255),
    published_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_type (type),
    INDEX idx_order (display_order),
    INDEX idx_active (is_active),
    INDEX idx_platform (video_platform)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Featured videos for homepage';

-- Table: site_settings
CREATE TABLE site_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Setting key-value
    setting_key VARCHAR(255) NOT NULL UNIQUE,
    setting_value TEXT,
    
    -- Type for frontend parsing
    value_type ENUM('string', 'number', 'boolean', 'json', 'text') DEFAULT 'string',
    
    -- Group for organization
    setting_group VARCHAR(100) COMMENT 'e.g., contact, social, stats, seo',
    
    -- Display
    label VARCHAR(255),
    description TEXT,
    display_order INT DEFAULT 0,
    
    -- Editable in UI?
    is_public BOOLEAN DEFAULT TRUE COMMENT 'Can be accessed by public API',
    is_editable BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (setting_key),
    INDEX idx_group (setting_group),
    INDEX idx_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Site-wide settings and configuration';

-- Insert default settings
INSERT INTO site_settings (setting_key, setting_value, value_type, setting_group, label, description) VALUES
-- Contact Info
('contact.address', 'Đồng bằng sông Cửu Long, Việt Nam', 'string', 'contact', 'Địa chỉ', 'Địa chỉ công ty'),
('contact.email', 'info@happyworldmekong.com', 'string', 'contact', 'Email', 'Email liên hệ'),
('contact.hotline', '1900-xxxx', 'string', 'contact', 'Hotline', 'Số điện thoại hotline'),
('contact.working_hours', 'T2 - T6: 8:00 - 17:30, T7: 8:00 - 12:00', 'string', 'contact', 'Giờ làm việc', 'Thời gian làm việc'),

-- Social Links
('social.facebook', 'https://facebook.com/happyworldmekong', 'string', 'social', 'Facebook', 'Link Facebook'),
('social.youtube', 'https://youtube.com/@happyworldmekong', 'string', 'social', 'YouTube', 'Link YouTube'),
('social.instagram', 'https://instagram.com/happyworldmekong', 'string', 'social', 'Instagram', 'Link Instagram'),
('social.tiktok', 'https://tiktok.com/@happyworldmekong', 'string', 'social', 'TikTok', 'Link TikTok'),
('social.zalo', 'https://zalo.me/happyworldmekong', 'string', 'social', 'Zalo', 'Link Zalo'),

-- Homepage Stats
('stats.total_students', '100000', 'number', 'stats', 'Tổng số học viên', 'Tổng số học viên đã đào tạo'),
('stats.total_courses', '150', 'number', 'stats', 'Tổng số khóa học', 'Tổng số khóa học'),
('stats.total_instructors', '200', 'number', 'stats', 'Tổng số giảng viên', 'Tổng số giảng viên và chuyên gia'),
('stats.total_partners', '50', 'number', 'stats', 'Tổng số đối tác', 'Tổng số đối tác chiến lược'),

-- SEO
('seo.site_name', 'Happy World Mekong', 'string', 'seo', 'Tên website', 'Tên website'),
('seo.site_description', 'Giáo dục từ miền Tây - Phát triển nguồn nhân lực Đồng bằng sông Cửu Long', 'text', 'seo', 'Mô tả website', 'Mô tả meta cho SEO'),
('seo.site_keywords', 'giáo dục, đào tạo, kỹ năng, mekong, đồng bằng sông cửu long', 'text', 'seo', 'Từ khóa', 'Meta keywords');

-- Insert sample banners (from current HeroSection.jsx hardcode)
INSERT INTO banners (title, title_en, description, description_en, image_url, link_url, type, display_order, is_active) VALUES
('📢 [TUẦN SHCD – ĐẠI HỌC CÔNG NGHỆ ĐÔNG Á X HAPPY WORLD MEKONG]', 
 '📢 [SHCD WEEK – DONG A UNIVERSITY X HAPPY WORLD MEKONG]',
 'Ngày 24/9/2025, sinh viên Trường Đại học Công nghệ Đông Á đã có một buổi sinh hoạt công dân đặc biệt với chủ đề: "Kỹ năng khởi nghiệp trong kỷ nguyên số"',
 'On September 24, 2025, students of Dong A University of Technology had a special civic activity session on the theme: "Entrepreneurship skills in the digital era"',
 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
 '/news/tuan-shcd-dai-hoc',
 'featured_news', 1, TRUE),

('🎉 [HAPPY WORLD MEKONG x HOU] KHAI GIẢNG HỌC PHẦN "PHÁT TRIỂN KỸ NĂNG NGHỀ NGHIỆP"',
 '🎉 [HAPPY WORLD MEKONG x HOU] OPENING OF "CAREER SKILLS DEVELOPMENT" COURSE',
 'Ngày 21/09/2025, tại Khoa Kinh tế - Trường Đại học Mở Hà Nội (HOU), học phần đã chính thức khai giảng trong không khí hứng khởi',
 'On September 21, 2025, at the Faculty of Economics - Hanoi Open University (HOU), the course officially opened in an exciting atmosphere',
 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
 '/news/khai-giang-hoc-phan',
 'featured_news', 2, TRUE),

('🎉 HAPPY WORLD MEKONG THAM DỰ CHƯƠNG TRÌNH CHÀO ĐÓN TÂN SINH VIÊN K19',
 '🎉 HAPPY WORLD MEKONG PARTICIPATES IN WELCOMING FRESHMEN K19',
 'Ngày 16/09/2025, Chương trình chào đón Tân sinh viên Khóa 19 đã diễn ra long trọng với sự tham gia của hơn 1.000 tân sinh viên',
 'On September 16, 2025, the Freshmen Welcoming Program for Batch 19 took place solemnly with the participation of over 1,000 freshmen',
 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
 '/news/chao-don-tan-sinh-vien',
 'featured_news', 3, TRUE);

-- Insert sample partners (from current PartnersSection.jsx)
INSERT INTO partners (name, logo_url, website_url, type, display_order, is_active) VALUES
('Đại học Cần Thơ', 'https://novaedu.vn/uploads/partners/1698231600_logo-dai-hoc-mo-ha-noi-inkythuatso-01-23-08-58-23.jpg', 'https://www.ctu.edu.vn/', 'university', 1, TRUE),
('Đại học An Giang', 'https://novaedu.vn/uploads/partners/1698208606_partner7.jpg', 'https://www.agu.edu.vn/', 'university', 2, TRUE),
('Bộ Giáo dục và Đào tạo', 'https://novaedu.vn/uploads/partners/1698231450_bo-giao-duc-va-dao-tao-tiep-tuc-xay-dung-va-hoan-thien-co-so-du-lieu-nganh-giao-duc.jpg', 'https://moet.gov.vn/', 'government', 3, TRUE),
('Tập đoàn Hòa Bình', 'https://novaedu.vn/uploads/partners/1698208735_partner6.png', 'https://hbcg.vn/', 'corporate', 4, TRUE),
('Đại học Kinh doanh và Công nghệ Hà Nội', 'https://novaedu.vn/uploads/partners/1698208783_partner3.jpg', 'https://hubt.edu.vn/', 'university', 5, TRUE),
('Đại học Kinh tế Quốc dân', 'https://novaedu.vn/uploads/partners/1698208898_partner10.png', 'https://www.neu.edu.vn/', 'university', 6, TRUE),
('Học viện Ngoại giao', 'https://novaedu.vn/uploads/partners/1698208947_partner9.png', 'https://www.dav.edu.vn/', 'university', 7, TRUE),
('Học viện Ngân hàng', 'https://novaedu.vn/uploads/partners/1698209011_Logo%20HVNH.png', 'https://www.hvnh.edu.vn/', 'university', 8, TRUE),
('ĐH Sư phạm Kỹ thuật TP.HCM', 'https://novaedu.vn/uploads/partners/1698231050_1200px-hcmute.svg.png', 'https://hcmute.edu.vn/', 'university', 9, TRUE);

-- Insert sample achievements (from current AchievementsSection.jsx)
INSERT INTO achievements (title, image_url, type, display_order, is_active) VALUES
('Thành tựu 1', 'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/07f22d6596836bdd3292-3.jpg', 'award', 1, TRUE),
('Thành tựu 2', 'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/7bafef0954efa9b1f0fe-copy-3.jpg', 'award', 2, TRUE),
('Thành tựu 3', 'https://novaedu.vn/uploads/photos/images/2020/07/thanh-tu-dat-duoc/bangkhen1-1.jpg', 'certificate', 3, TRUE),
('Thành tựu 4', 'https://novaedu.vn/uploads/photos/images/2021/01/thanh-tu-dat-duoc/bang.png', 'certificate', 4, TRUE),
('Thành tựu 5', 'https://novaedu.vn/uploads/images/1703045868_1.png', 'recognition', 5, TRUE),
('Thành tựu 6', 'https://novaedu.vn/uploads/images/1717389513_z5502538615808_335c486a050eb38284afac8fdb5ab601.jpg', 'recognition', 6, TRUE),
('Thành tựu 7', 'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/8e2bbea20544f81aa155-copy-3-3.jpg', 'award', 7, TRUE),
('Thành tựu 8', 'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/15f9bb5200b4fdeaa4a5-copy-3.jpg', 'award', 8, TRUE);

-- Insert sample videos (from current VideosSection.jsx)
INSERT INTO featured_videos (title, title_en, thumbnail_url, video_url, video_platform, video_id, type, author, published_date, display_order, is_active) VALUES
('Chuyên gia chia sẻ về Kỹ năng khởi nghiệp', 'Expert shares about Entrepreneurship Skills',
 'https://novaedu.vn/uploads/video-clip/images/anh-lam-chu-cam-xuc.png',
 'https://novaedu.vn/video-clip/chuyen-gia-do-manh-hung-chia-se-ve-chu-de-lam-chu-cam-xuc-54.html',
 'external', NULL, 'tutorial', 'Admin', '2020-07-30', 1, TRUE),

('CEO chia sẻ về Kỹ năng thích ứng', 'CEO shares about Adaptation Skills',
 'https://novaedu.vn/uploads/video-clip/images/anh-truyen-hinh.png',
 'https://novaedu.vn/video-clip/ceo-do-manh-hung-chia-se-ve-ky-nang-thich-ung-1-53.html',
 'external', NULL, 'tutorial', 'Admin', '2020-07-29', 2, TRUE),

('Giới trẻ và sự vô cảm với cuộc sống', 'Youth and indifference to life',
 'https://novaedu.vn/uploads/video-clip/images/1.jpg',
 'https://novaedu.vn/video-clip/ceo-do-manh-hung-chia-se-ve-chu-de-gioi-tre-va-su-vo-cam-voi-cuoc-song-52.html',
 'external', NULL, 'testimonial', 'Admin', '2020-05-26', 3, TRUE),

('Nghệ thuật thỏa hiệp với cảm xúc', 'The art of emotional compromise',
 'https://novaedu.vn/uploads/video-clip/images/tai-xuong-2.jpg',
 'https://novaedu.vn/video-clip/ceo-do-manh-hung-chia-se-ve-nghe-thuat-thoa-hiep-voi-cam-xuc-51.html',
 'external', NULL, 'tutorial', 'Admin', '2020-05-26', 4, TRUE);

