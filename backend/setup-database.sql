-- =============================================
-- Setup Database for Happy World Mekong
-- Run this file first before starting the application
-- =============================================

-- Drop existing database (CAUTION: This will delete all data!)
-- DROP DATABASE IF EXISTS happyworld_mekong;

-- Create database with proper charset
CREATE DATABASE IF NOT EXISTS happyworld_mekong 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE happyworld_mekong;

-- Create application user (optional, for production)
-- CREATE USER IF NOT EXISTS 'happyworld'@'localhost' IDENTIFIED BY 'your_strong_password';
-- GRANT ALL PRIVILEGES ON happyworld_mekong.* TO 'happyworld'@'localhost';
-- FLUSH PRIVILEGES;

-- Show databases
SHOW DATABASES LIKE 'happyworld_mekong';

SELECT 'Database happyworld_mekong created successfully!' AS message;
SELECT 'Next step: Run mvn spring-boot:run' AS next_step;

