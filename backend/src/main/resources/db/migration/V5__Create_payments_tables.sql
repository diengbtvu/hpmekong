-- =============================================
-- Create Payments Tables
-- Version: 5.0
-- Description: Payment & Transaction System
-- =============================================

-- Table: payments
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- Payment Info
    payment_code VARCHAR(100) NOT NULL UNIQUE COMMENT 'MK-PAY-YYYYMMDD-XXXXX',
    
    -- Amount
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'VND',
    
    -- Payment Method
    payment_method ENUM('vnpay', 'momo', 'bank_transfer', 'cash', 'crypto') NOT NULL,
    
    -- Payment Gateway Response
    gateway_transaction_id VARCHAR(255) COMMENT 'Transaction ID from VNPay, Momo',
    gateway_response TEXT COMMENT 'JSON response from gateway',
    
    -- Purpose
    payment_type ENUM('course_enrollment', 'job_posting', 'subscription', 'book_purchase', 'space_rental', 'other'),
    reference_type VARCHAR(50) COMMENT 'course, job_package, subscription',
    reference_id BIGINT COMMENT 'ID of course, job package, etc.',
    
    -- Status
    status ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled') DEFAULT 'pending',
    
    -- Dates
    paid_at TIMESTAMP NULL,
    refunded_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL COMMENT 'For pending payments',
    
    -- Refund
    refund_amount DECIMAL(12,2),
    refund_reason TEXT,
    refunded_by BIGINT,
    
    -- Metadata
    metadata JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (refunded_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_code (payment_code),
    INDEX idx_status (status),
    INDEX idx_method (payment_method),
    INDEX idx_type (payment_type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Payment transactions';

-- Table: transactions
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    payment_id BIGINT,
    
    -- Transaction Info
    transaction_type ENUM('payment', 'refund', 'commission', 'withdrawal', 'bonus') NOT NULL,
    
    -- Amount
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'VND',
    
    -- Balance (wallet)
    balance_before DECIMAL(12,2) DEFAULT 0,
    balance_after DECIMAL(12,2) DEFAULT 0,
    
    -- Description
    description TEXT,
    
    -- Reference
    reference_type VARCHAR(50),
    reference_id BIGINT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_payment (payment_id),
    INDEX idx_type (transaction_type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Transaction history';

-- Table: coupons
CREATE TABLE coupons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Coupon Info
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    
    -- Discount
    discount_type ENUM('percentage', 'fixed_amount') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    max_discount_amount DECIMAL(10,2) COMMENT 'For percentage type',
    
    -- Conditions
    min_purchase_amount DECIMAL(10,2),
    applicable_to ENUM('all', 'course', 'center', 'specific_courses') DEFAULT 'all',
    applicable_ids TEXT COMMENT 'JSON array of IDs',
    
    -- Usage Limits
    usage_limit INT COMMENT 'NULL = unlimited',
    usage_count INT DEFAULT 0,
    usage_per_user INT DEFAULT 1,
    
    -- Validity
    is_active BOOLEAN DEFAULT TRUE,
    starts_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id),
    
    INDEX idx_code (code),
    INDEX idx_active (is_active),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Discount coupons';

-- Table: coupon_usages
CREATE TABLE coupon_usages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    coupon_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    payment_id BIGINT,
    
    discount_amount DECIMAL(10,2) NOT NULL,
    
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (coupon_id) REFERENCES coupons(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    
    INDEX idx_coupon (coupon_id),
    INDEX idx_user (user_id),
    INDEX idx_used (used_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Coupon usage history';

-- Add payment_id foreign key to enrollments
ALTER TABLE enrollments
ADD FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL;

