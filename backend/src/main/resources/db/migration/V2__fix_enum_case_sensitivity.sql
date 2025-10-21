-- Fix enum values to match Java entity (uppercase)
-- This migration fixes the case sensitivity issue between database and Java enums

-- Fix courses.level enum
ALTER TABLE courses MODIFY COLUMN level VARCHAR(20) DEFAULT 'ALL_LEVELS';
UPDATE courses SET level = UPPER(level) WHERE level IS NOT NULL;
ALTER TABLE courses MODIFY COLUMN level ENUM('BEGINNER','INTERMEDIATE','ADVANCED','ALL_LEVELS') DEFAULT 'ALL_LEVELS';

-- Fix courses.delivery_mode enum
ALTER TABLE courses MODIFY COLUMN delivery_mode VARCHAR(20) DEFAULT 'ONLINE';
UPDATE courses SET delivery_mode = UPPER(delivery_mode) WHERE delivery_mode IS NOT NULL;
ALTER TABLE courses MODIFY COLUMN delivery_mode ENUM('ONLINE','OFFLINE','HYBRID') DEFAULT 'ONLINE';

-- Fix courses.status enum
ALTER TABLE courses MODIFY COLUMN status VARCHAR(20) DEFAULT 'DRAFT';
UPDATE courses SET status = UPPER(status) WHERE status IS NOT NULL;
ALTER TABLE courses MODIFY COLUMN status ENUM('DRAFT','PENDING_REVIEW','PUBLISHED','ARCHIVED') DEFAULT 'DRAFT';
