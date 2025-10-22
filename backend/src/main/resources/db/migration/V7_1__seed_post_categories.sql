-- Seed post categories
INSERT INTO post_categories (name, slug, description, color, icon, display_order, is_active, created_at, updated_at)
VALUES
('Tin hoạt động', 'activities', 'Tin tức về các hoạt động, sự kiện của Happy World Mekong', '#3B82F6', 'fa-newspaper', 1, 1, NOW(), NOW()),
('Tuyển dụng', 'recruitment', 'Thông tin tuyển dụng giảng viên, nhân sự', '#10B981', 'fa-briefcase', 2, 1, NOW(), NOW()),
('Sự kiện', 'events', 'Các sự kiện sắp diễn ra', '#F59E0B', 'fa-calendar-alt', 3, 1, NOW(), NOW()),
('Thông báo', 'announcements', 'Thông báo chính thức từ ban lãnh đạo', '#EF4444', 'fa-bullhorn', 4, 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE updated_at = NOW();
