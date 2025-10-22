-- =============================================
-- Fix Enum Case Sensitivity Issues
-- Version: 11.0
-- Description: Update all enum columns to UPPERCASE to match Java entities
-- =============================================

-- Fix enrollments.status enum
ALTER TABLE enrollments 
MODIFY COLUMN status ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED') 
NOT NULL DEFAULT 'PENDING';

-- Update existing enrollment data to uppercase
UPDATE enrollments 
SET status = UPPER(status)
WHERE status IN ('pending', 'active', 'completed', 'cancelled', 'expired');

-- Fix payments.status enum
ALTER TABLE payments
MODIFY COLUMN status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED')
NOT NULL DEFAULT 'PENDING';

-- Update existing payment status data
UPDATE payments 
SET status = UPPER(status)
WHERE status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled');

-- Fix payments.payment_type enum
ALTER TABLE payments 
MODIFY COLUMN payment_type ENUM('COURSE_ENROLLMENT', 'JOB_POSTING', 'SUBSCRIPTION', 'BOOK_PURCHASE', 'SPACE_RENTAL', 'OTHER')
NOT NULL;

-- Update existing payment_type data
UPDATE payments 
SET payment_type = 
    CASE 
        WHEN payment_type = 'course_enrollment' THEN 'COURSE_ENROLLMENT'
        WHEN payment_type = 'job_posting' THEN 'JOB_POSTING'
        WHEN payment_type = 'subscription' THEN 'SUBSCRIPTION'
        WHEN payment_type = 'book_purchase' THEN 'BOOK_PURCHASE'
        WHEN payment_type = 'space_rental' THEN 'SPACE_RENTAL'
        WHEN payment_type = 'other' THEN 'OTHER'
        ELSE payment_type
    END
WHERE payment_type IN ('course_enrollment', 'job_posting', 'subscription', 'book_purchase', 'space_rental', 'other');

-- Fix payments.reference_type - convert to enum and uppercase
ALTER TABLE payments
MODIFY COLUMN reference_type ENUM('COURSE', 'JOB_PACKAGE', 'SUBSCRIPTION', 'BOOK', 'SPACE', 'OTHER')
NOT NULL;

-- Update existing reference_type data
UPDATE payments 
SET reference_type = 
    CASE 
        WHEN reference_type = 'course' THEN 'COURSE'
        WHEN reference_type = 'job_package' THEN 'JOB_PACKAGE'
        WHEN reference_type = 'subscription' THEN 'SUBSCRIPTION'
        WHEN reference_type = 'book' THEN 'BOOK'
        WHEN reference_type = 'space' THEN 'SPACE'
        WHEN reference_type = 'other' THEN 'OTHER'
        ELSE 'OTHER'
    END;

-- Fix payments.payment_method enum (already has PAYOS from previous fix)
ALTER TABLE payments
MODIFY COLUMN payment_method ENUM('PAYOS', 'VNPAY', 'MOMO', 'BANK_TRANSFER', 'CASH', 'CRYPTO')
NOT NULL;

-- Update existing payment_method data
UPDATE payments 
SET payment_method = 
    CASE 
        WHEN payment_method = 'vnpay' THEN 'VNPAY'
        WHEN payment_method = 'momo' THEN 'MOMO'
        WHEN payment_method = 'bank_transfer' THEN 'BANK_TRANSFER'
        WHEN payment_method = 'cash' THEN 'CASH'
        WHEN payment_method = 'crypto' THEN 'CRYPTO'
        WHEN payment_method = 'payos' THEN 'PAYOS'
        ELSE payment_method
    END
WHERE payment_method IN ('vnpay', 'momo', 'bank_transfer', 'cash', 'crypto', 'payos');
