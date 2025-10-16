# 🏗️ PHÂN TÍCH & THIẾT KẾ BACKEND - HAPPY WORLD MEKONG

## 📋 Mục lục

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Phân tích User Roles & Permissions](#2-phân-tích-user-roles--permissions)
3. [Database Schema](#3-database-schema)
4. [API Endpoints](#4-api-endpoints)
5. [Entity & DTO Models](#5-entity--dto-models)
6. [Service Layer Architecture](#6-service-layer-architecture)
7. [Security & Authentication](#7-security--authentication)
8. [File Upload & Storage](#8-file-upload--storage)
9. [Payment Integration](#9-payment-integration)
10. [Email & Notification System](#10-email--notification-system)
11. [Admin Dashboard Features](#11-admin-dashboard-features)
12. [Deployment & DevOps](#12-deployment--devops)

---

## 1. Tổng quan hệ thống

### 1.1. Giới thiệu

**Happy World Mekong** là nền tảng giáo dục công nghệ toàn diện cho khu vực Đồng bằng sông Cửu Long với hệ sinh thái 9 trung tâm đào tạo. Backend được thiết kế để hỗ trợ:

- ✅ Quản lý khóa học và học viên
- ✅ Hệ thống LMS (Learning Management System)
- ✅ Quản lý 9 trung tâm ecosystem
- ✅ Kết nối việc làm (Job matching)
- ✅ Thương mại điện tử (Khóa học, sách)
- ✅ Quản lý nội dung (CMS)
- ✅ Hệ thống thanh toán
- ✅ Analytics & Reporting

### 1.2. Tech Stack

#### Backend Core
```yaml
Framework: Spring Boot 3.2.x
Language: Java 17 LTS
Build Tool: Maven 3.9.x
ORM: Spring Data JPA + Hibernate 6.x
Database: MySQL 8.0+ (Production) / PostgreSQL 16+ (Alternative)
Cache: Redis 7.x
Search Engine: Elasticsearch 8.x (Optional for advanced search)
Message Queue: RabbitMQ 3.12.x (For async tasks)
```

#### Security & Authentication
```yaml
Spring Security: 6.2.x
JWT: jjwt 0.12.x
OAuth2: Spring OAuth2 Client
2FA: Google Authenticator
Password Encryption: BCrypt
```

#### Storage & Media
```yaml
File Storage: AWS S3 / MinIO
Image Processing: Thumbnailator
Video Processing: FFmpeg (via external service)
CDN: CloudFront / Cloudflare
```

#### Payment Integration
```yaml
VNPay: Official SDK
Momo: Official API
Banking: Vietcombank, Techcombank APIs
Crypto: (Future: USDT)
```

#### Email & Notifications
```yaml
Email: JavaMailSender + Thymeleaf templates
SMS: Twilio / VNNHN SMS Gateway
Push Notifications: Firebase Cloud Messaging (FCM)
```

#### Monitoring & Logging
```yaml
Logging: SLF4J + Logback
Monitoring: Prometheus + Grafana
APM: Spring Boot Actuator
Error Tracking: Sentry
```

#### Testing
```yaml
Unit Test: JUnit 5 + Mockito
Integration Test: TestContainers
API Test: REST Assured
Load Test: JMeter / Gatling
```

### 1.3. Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  Web (React) │ Mobile App (React Native) │ Admin Dashboard      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │  (Spring Cloud Gateway - Optional)
                    │   + Load Balance│
                    └────────┬────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                    APPLICATION LAYER                              │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Auth API   │  │  Course API  │  │   User API   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│  ┌──────▼──────────────────▼──────────────────▼───────┐         │
│  │           BUSINESS LOGIC LAYER (Services)           │         │
│  │  - AuthService  - CourseService  - UserService      │         │
│  │  - EnrollmentService  - PaymentService  - etc.      │         │
│  └──────────────────────┬──────────────────────────────┘         │
│                         │                                         │
│  ┌──────────────────────▼──────────────────────────────┐         │
│  │         DATA ACCESS LAYER (Repositories)             │         │
│  │  - UserRepository  - CourseRepository  - etc.        │         │
│  └──────────────────────┬──────────────────────────────┘         │
└────────────────────────┬┼────────────────────────────────────────┘
                         ││
        ┌────────────────┘└────────────────┐
        │                                   │
┌───────▼────────┐              ┌──────────▼──────────┐
│  MySQL/Postgres│              │   Redis Cache       │
│   Database     │              │   Session Store     │
└────────────────┘              └─────────────────────┘
        │
        │
┌───────▼────────┐              ┌─────────────────────┐
│  File Storage  │              │   Message Queue     │
│  (S3/MinIO)    │              │   (RabbitMQ)        │
└────────────────┘              └─────────────────────┘
```

### 1.4. Cấu trúc thư mục dự án

```
happyworldmekong-backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── happyworld/
│   │   │           └── mekong/
│   │   │               ├── MekongApplication.java
│   │   │               │
│   │   │               ├── config/
│   │   │               │   ├── SecurityConfig.java
│   │   │               │   ├── JwtConfig.java
│   │   │               │   ├── CorsConfig.java
│   │   │               │   ├── RedisConfig.java
│   │   │               │   ├── S3Config.java
│   │   │               │   └── AsyncConfig.java
│   │   │               │
│   │   │               ├── controller/
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── UserController.java
│   │   │               │   ├── CourseController.java
│   │   │               │   ├── EnrollmentController.java
│   │   │               │   ├── InstructorController.java
│   │   │               │   ├── PostController.java
│   │   │               │   ├── ContactController.java
│   │   │               │   ├── PaymentController.java
│   │   │               │   ├── JobController.java
│   │   │               │   ├── CenterController.java
│   │   │               │   └── admin/
│   │   │               │       ├── AdminDashboardController.java
│   │   │               │       ├── AdminUserController.java
│   │   │               │       ├── AdminCourseController.java
│   │   │               │       └── AdminAnalyticsController.java
│   │   │               │
│   │   │               ├── dto/
│   │   │               │   ├── request/
│   │   │               │   │   ├── LoginRequest.java
│   │   │               │   │   ├── RegisterRequest.java
│   │   │               │   │   ├── CourseCreateRequest.java
│   │   │               │   │   └── ...
│   │   │               │   ├── response/
│   │   │               │   │   ├── AuthResponse.java
│   │   │               │   │   ├── CourseResponse.java
│   │   │               │   │   ├── UserResponse.java
│   │   │               │   │   └── ...
│   │   │               │   └── common/
│   │   │               │       ├── PageResponse.java
│   │   │               │       └── ApiResponse.java
│   │   │               │
│   │   │               ├── entity/
│   │   │               │   ├── User.java
│   │   │               │   ├── Role.java
│   │   │               │   ├── Course.java
│   │   │               │   ├── Lesson.java
│   │   │               │   ├── Enrollment.java
│   │   │               │   ├── Progress.java
│   │   │               │   ├── Review.java
│   │   │               │   ├── Instructor.java
│   │   │               │   ├── Post.java
│   │   │               │   ├── Category.java
│   │   │               │   ├── Center.java
│   │   │               │   ├── Partner.java
│   │   │               │   ├── Job.java
│   │   │               │   ├── Application.java
│   │   │               │   ├── Payment.java
│   │   │               │   ├── Transaction.java
│   │   │               │   ├── Certificate.java
│   │   │               │   └── ...
│   │   │               │
│   │   │               ├── repository/
│   │   │               │   ├── UserRepository.java
│   │   │               │   ├── RoleRepository.java
│   │   │               │   ├── CourseRepository.java
│   │   │               │   ├── EnrollmentRepository.java
│   │   │               │   ├── InstructorRepository.java
│   │   │               │   ├── PostRepository.java
│   │   │               │   ├── JobRepository.java
│   │   │               │   └── ...
│   │   │               │
│   │   │               ├── service/
│   │   │               │   ├── AuthService.java
│   │   │               │   ├── UserService.java
│   │   │               │   ├── CourseService.java
│   │   │               │   ├── EnrollmentService.java
│   │   │               │   ├── InstructorService.java
│   │   │               │   ├── PostService.java
│   │   │               │   ├── PaymentService.java
│   │   │               │   ├── EmailService.java
│   │   │               │   ├── StorageService.java
│   │   │               │   ├── JobService.java
│   │   │               │   ├── CertificateService.java
│   │   │               │   └── AnalyticsService.java
│   │   │               │
│   │   │               ├── security/
│   │   │               │   ├── JwtTokenProvider.java
│   │   │               │   ├── JwtAuthenticationFilter.java
│   │   │               │   ├── CustomUserDetailsService.java
│   │   │               │   └── SecurityUtils.java
│   │   │               │
│   │   │               ├── exception/
│   │   │               │   ├── GlobalExceptionHandler.java
│   │   │               │   ├── ResourceNotFoundException.java
│   │   │               │   ├── UnauthorizedException.java
│   │   │               │   ├── BadRequestException.java
│   │   │               │   └── ...
│   │   │               │
│   │   │               ├── util/
│   │   │               │   ├── FileUtils.java
│   │   │               │   ├── DateUtils.java
│   │   │               │   ├── ValidationUtils.java
│   │   │               │   └── SlugUtils.java
│   │   │               │
│   │   │               └── constant/
│   │   │                   ├── AppConstants.java
│   │   │                   ├── RoleConstants.java
│   │   │                   └── MessageConstants.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── application-test.yml
│   │       ├── db/
│   │       │   └── migration/
│   │       │       ├── V1__Create_users_table.sql
│   │       │       ├── V2__Create_courses_table.sql
│   │       │       └── ...
│   │       ├── templates/
│   │       │   └── email/
│   │       │       ├── welcome.html
│   │       │       ├── enrollment-confirmation.html
│   │       │       ├── certificate.html
│   │       │       └── ...
│   │       └── static/
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── happyworld/
│                   └── mekong/
│                       ├── controller/
│                       ├── service/
│                       └── integration/
│
├── pom.xml
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 2. Phân tích User Roles & Permissions

### 2.1. Các vai trò trong hệ thống

```java
public enum RoleType {
    SUPER_ADMIN,    // Quản trị viên cấp cao nhất
    ADMIN,          // Quản trị viên
    CENTER_MANAGER, // Quản lý trung tâm (1 trong 9 centers)
    INSTRUCTOR,     // Giảng viên
    STUDENT,        // Học viên
    PARTNER,        // Đối tác
    EMPLOYER,       // Nhà tuyển dụng
    USER            // Người dùng thường
}
```

### 2.2. Chi tiết quyền hạn từng vai trò

#### 2.2.1. SUPER_ADMIN (Quản trị viên cấp cao)
**Toàn quyền trên hệ thống**

```yaml
Permissions:
  Users:
    - Xem, thêm, sửa, xóa tất cả users
    - Gán/thu hồi roles
    - Khóa/mở khóa tài khoản
    - Reset password
    - Xem lịch sử hoạt động
  
  Courses:
    - CRUD tất cả khóa học
    - Approve/reject khóa học
    - Quản lý danh mục
    - Quản lý giá, discount
    - Xem thống kê
  
  Content:
    - CRUD posts, news
    - Quản lý media library
    - SEO settings
  
  Centers:
    - CRUD 9 centers
    - Gán center manager
    - Xem thống kê từng center
  
  Financial:
    - Xem tất cả giao dịch
    - Approve refund
    - Export reports
    - Quản lý payment methods
  
  System:
    - Cấu hình hệ thống
    - Backup/restore
    - View logs
    - Email templates
    - SMS settings
```

#### 2.2.2. ADMIN (Quản trị viên)
**Quản lý nội dung và vận hành**

```yaml
Permissions:
  Users:
    - Xem users (không xóa SUPER_ADMIN)
    - Thêm/sửa user thường
    - Khóa tài khoản (không khóa ADMIN trở lên)
  
  Courses:
    - CRUD khóa học
    - Quản lý enrollments
    - Xem reviews
  
  Content:
    - CRUD posts, news
    - Upload media
  
  Centers:
    - Xem thông tin centers
    - Sửa nội dung (không xóa)
  
  Financial:
    - Xem reports
    - Export data
  
  Support:
    - Trả lời contact form
    - Quản lý tickets
```

#### 2.2.3. CENTER_MANAGER (Quản lý trung tâm)
**Quản lý 1 trong 9 trung tâm**

```yaml
Permissions:
  Own Center:
    - Xem dashboard center riêng
    - Quản lý khóa học thuộc center
    - Xem danh sách học viên
    - Gán instructors
    - Xem doanh thu center
  
  Courses (Own Center):
    - Tạo/sửa khóa học
    - Quản lý lessons
    - Xem reviews
  
  Instructors:
    - Mời instructors
    - Gán courses
  
  Reports:
    - Export enrollment data
    - Revenue reports (own center)
```

#### 2.2.4. INSTRUCTOR (Giảng viên)
**Giảng dạy và quản lý học viên**

```yaml
Permissions:
  Own Courses:
    - Xem danh sách khóa học được gán
    - Upload/edit lessons
    - Upload materials
    - Xem enrollments
    - Xem reviews
  
  Students:
    - Xem danh sách học viên
    - Xem progress
    - Chấm điểm/đánh giá
    - Chat/messaging
  
  Certificates:
    - Issue certificates
  
  Profile:
    - Update profile
    - Upload avatar
    - Manage bio
```

#### 2.2.5. STUDENT (Học viên)
**Học tập và quản lý học tập của mình**

```yaml
Permissions:
  Courses:
    - Xem danh sách khóa học
    - Enroll khóa học (sau khi payment)
    - Xem lessons
    - Download materials
    - Submit assignments
  
  Learning:
    - Mark lessons complete
    - Take quizzes
    - View progress
    - Download certificates
  
  Reviews:
    - Write/edit own reviews
    - Rate courses
  
  Profile:
    - Update profile
    - Change password
    - Upload avatar
    - View transaction history
  
  Jobs (nếu dùng Mekong Job):
    - Create CV
    - Apply jobs
    - View applications
```

#### 2.2.6. PARTNER (Đối tác - Trường ĐH, Tổ chức)
**Hợp tác đào tạo**

```yaml
Permissions:
  Courses:
    - Xem khóa học
    - Request partnership
  
  Students:
    - Xem danh sách học viên (nếu hợp tác)
    - Export reports
  
  Events:
    - Tạo sự kiện hợp tác
    - Job fairs
  
  Profile:
    - Update company profile
    - Upload logo
```

#### 2.2.7. EMPLOYER (Nhà tuyển dụng)
**Đăng tin tuyển dụng trên Mekong Job**

```yaml
Permissions:
  Jobs:
    - Post job listings
    - Edit/delete own jobs
    - View applications
    - Search candidates
  
  Candidates:
    - View CVs
    - Contact candidates
    - Schedule interviews
  
  Company:
    - Update company profile
    - Upload logo
  
  Packages:
    - Subscribe job posting packages
    - View billing
```

#### 2.2.8. USER (Người dùng thường)
**Xem thông tin, chưa đăng ký học**

```yaml
Permissions:
  Public:
    - Xem khóa học
    - Xem instructors
    - Xem news
    - Xem centers
    - Submit contact form
  
  Limited:
    - Không xem nội dung bài học
    - Không download materials
    - Không enroll (phải upgrade to STUDENT)
```

### 2.3. Permission Matrix

| Feature | SUPER_ADMIN | ADMIN | CENTER_MGR | INSTRUCTOR | STUDENT | PARTNER | EMPLOYER | USER |
|---------|:-----------:|:-----:|:----------:|:----------:|:-------:|:-------:|:--------:|:----:|
| **User Management** |
| Create User | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit User | ✅ | ✅ | ❌ | ❌ | Own | Own | Own | Own |
| Delete User | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Assign Roles | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Course Management** |
| Create Course | ✅ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit Course | ✅ | ✅ | ✅* | ✅** | ❌ | ❌ | ❌ | ❌ |
| Delete Course | ✅ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ | ❌ |
| View Courses | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Content Management** |
| Create Lesson | ✅ | ✅ | ✅* | ✅** | ❌ | ❌ | ❌ | ❌ |
| Edit Lesson | ✅ | ✅ | ✅* | ✅** | ❌ | ❌ | ❌ | ❌ |
| Delete Lesson | ✅ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ | ❌ |
| View Lesson Content | ✅ | ✅ | ✅ | ✅ | ✅*** | ❌ | ❌ | ❌ |
| **Enrollment** |
| Enroll Course | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Enrollments | ✅ | ✅ | ✅* | ✅** | Own | ❌ | ❌ | ❌ |
| Issue Certificate | ✅ | ✅ | ✅* | ✅** | ❌ | ❌ | ❌ | ❌ |
| **News & Posts** |
| Create Post | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit Post | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Delete Post | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View Posts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Jobs (Mekong Job)** |
| Post Job | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Edit Job | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅**** | ❌ |
| Delete Job | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅**** | ❌ |
| Apply Job | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Applications | ✅ | ✅ | ❌ | ❌ | Own | ❌ | ✅**** | ❌ |
| **Financial** |
| View All Transactions | ✅ | ✅ | ⚠️* | ❌ | Own | ❌ | Own | ❌ |
| Issue Refund | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Export Reports | ✅ | ✅ | ✅* | ❌ | ❌ | ⚠️ | ❌ | ❌ |
| **System Settings** |
| System Config | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Email Templates | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Backup/Restore | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Chú thích:**
- ✅ = Full access
- ⚠️ = Limited access
- ❌ = No access
- Own = Chỉ own resources
- \* = Chỉ trong center của mình
- \** = Chỉ courses được gán
- \*** = Chỉ nếu đã enroll
- \**** = Chỉ own jobs

---

## 3. Database Schema

### 3.1. Tổng quan Database

**Database Management System**: MySQL 8.0+ / PostgreSQL 16+

**Các nhóm bảng chính:**
1. **Authentication & User Management** (6 bảng)
2. **Course & Learning Management** (10 bảng)
3. **Content Management** (5 bảng)
4. **Job & Career** (4 bảng)
5. **Payment & Transaction** (4 bảng)
6. **Center & Partner Management** (3 bảng)
7. **Communication** (3 bảng)
8. **Analytics & Logs** (3 bảng)

**Tổng số bảng**: ~38 bảng

### 3.2. ERD (Entity Relationship Diagram)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION & USER MANAGEMENT                  │
└─────────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌────▼────┐          ┌────▼────┐         ┌────▼────┐
    │  users  │──────────│  roles  │         │profiles │
    └────┬────┘          └─────────┘         └─────────┘
         │
         └──────┬────────────┬────────────┬────────────┐
                │            │            │            │
┌───────────────▼───────────────────────────────────────────────────┐
│              COURSE & LEARNING MANAGEMENT                         │
└───────────────────────────────────────────────────────────────────┘
         │            │            │            │
    ┌────▼────┐  ┌───▼────┐  ┌────▼─────┐  ┌──▼──────┐
    │ courses │  │lessons │  │enrollments│  │reviews  │
    └────┬────┘  └───┬────┘  └────┬─────┘  └─────────┘
         │            │            │
    ┌────▼────┐  ┌───▼────┐  ┌────▼─────┐
    │categories│  │progress│  │certificates│
    └─────────┘  └────────┘  └──────────┘
```

### 3.3. Chi tiết từng bảng

#### 3.3.1. AUTHENTICATION & USER MANAGEMENT

##### Bảng: `users`
**Mô tả**: Lưu thông tin đăng nhập và xác thực người dùng

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL, -- BCrypt hashed
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
    oauth_provider VARCHAR(50), -- 'google', 'facebook', 'zalo'
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
    deleted_at TIMESTAMP NULL, -- Soft delete
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_phone (phone),
    INDEX idx_oauth (oauth_provider, oauth_id),
    INDEX idx_active (is_active, is_verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `roles`
**Mô tả**: Định nghĩa các vai trò trong hệ thống

```sql
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- 'SUPER_ADMIN', 'ADMIN', 'STUDENT', etc.
    display_name VARCHAR(100),
    description TEXT,
    level INT DEFAULT 0, -- Cấp độ ưu tiên (cao hơn = quyền cao hơn)
    is_system_role BOOLEAN DEFAULT FALSE, -- Không cho xóa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mặc định
INSERT INTO roles (name, display_name, level, is_system_role) VALUES
('SUPER_ADMIN', 'Quản trị viên cấp cao', 100, TRUE),
('ADMIN', 'Quản trị viên', 90, TRUE),
('CENTER_MANAGER', 'Quản lý trung tâm', 70, TRUE),
('INSTRUCTOR', 'Giảng viên', 50, TRUE),
('STUDENT', 'Học viên', 30, TRUE),
('PARTNER', 'Đối tác', 20, TRUE),
('EMPLOYER', 'Nhà tuyển dụng', 20, TRUE),
('USER', 'Người dùng', 10, TRUE);
```

##### Bảng: `user_roles`
**Mô tả**: Mapping nhiều-nhiều giữa user và role

```sql
CREATE TABLE user_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_by BIGINT, -- Admin nào gán
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_user_role (user_id, role_id),
    INDEX idx_user_id (user_id),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `permissions`
**Mô tả**: Các quyền cụ thể trong hệ thống

```sql
CREATE TABLE permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- 'user.create', 'course.edit', etc.
    resource VARCHAR(50), -- 'user', 'course', 'post'
    action VARCHAR(50), -- 'create', 'read', 'update', 'delete'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `role_permissions`
**Mô tả**: Mapping giữa role và permission

```sql
CREATE TABLE role_permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_role_permission (role_id, permission_id),
    INDEX idx_role_id (role_id),
    INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `profiles`
**Mô tả**: Thông tin chi tiết của user

```sql
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
    education_level VARCHAR(50), -- 'high_school', 'bachelor', 'master', 'phd'
    school VARCHAR(255),
    major VARCHAR(255),
    graduation_year INT,
    
    -- Preferences
    preferred_language VARCHAR(10) DEFAULT 'vi',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    
    -- Metadata
    metadata JSON, -- Lưu thêm thông tin tùy chỉnh
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_full_name (full_name),
    INDEX idx_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.2. COURSE & LEARNING MANAGEMENT

##### Bảng: `centers`
**Mô tả**: 9 trung tâm trong hệ sinh thái

```sql
CREATE TABLE centers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    
    -- Brand
    tagline VARCHAR(500),
    description TEXT,
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    primary_color VARCHAR(7), -- Hex color
    
    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(500),
    
    -- Manager
    manager_id BIGINT, -- User with CENTER_MANAGER role
    
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
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu 9 centers
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
```

##### Bảng: `categories`
**Mô tả**: Danh mục khóa học

```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id BIGINT NULL, -- Cho phép category con
    icon VARCHAR(255),
    color VARCHAR(7),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `instructors`
**Mô tả**: Thông tin giảng viên

```sql
CREATE TABLE instructors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    
    -- Professional Info
    title VARCHAR(255), -- 'Tiến sĩ', 'Thạc sĩ', 'Giảng viên'
    expertise TEXT, -- JSON array: ['Marketing', 'Sales', 'Leadership']
    years_of_experience INT,
    
    -- Bio
    short_bio VARCHAR(500),
    full_bio TEXT,
    achievements TEXT, -- JSON array of achievements
    
    -- Media
    video_intro_url VARCHAR(500),
    
    -- Stats
    total_students INT DEFAULT 0,
    total_courses INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    
    -- Status
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Social
    linkedin_url VARCHAR(500),
    facebook_url VARCHAR(500),
    youtube_url VARCHAR(500),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active),
    INDEX idx_rating (average_rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `courses`
**Mô tả**: Khóa học

```sql
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    subtitle VARCHAR(500),
    description TEXT,
    
    -- Content
    what_you_will_learn TEXT, -- JSON array
    requirements TEXT, -- JSON array
    target_audience TEXT, -- JSON array
    
    -- Organization
    center_id BIGINT NOT NULL,
    category_id BIGINT,
    instructor_id BIGINT,
    
    -- Media
    thumbnail_url VARCHAR(500),
    preview_video_url VARCHAR(500),
    
    -- Pricing
    price DECIMAL(10,2) DEFAULT 0.00,
    original_price DECIMAL(10,2),
    discount_percentage INT DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    
    -- Course Info
    level ENUM('beginner', 'intermediate', 'advanced', 'all_levels') DEFAULT 'all_levels',
    language VARCHAR(10) DEFAULT 'vi',
    duration_hours INT, -- Tổng số giờ
    total_lessons INT DEFAULT 0,
    
    -- Delivery
    delivery_mode ENUM('online', 'offline', 'hybrid') DEFAULT 'online',
    
    -- Status
    status ENUM('draft', 'pending_review', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    
    -- Stats
    total_students INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_views INT DEFAULT 0,
    
    -- Certificate
    has_certificate BOOLEAN DEFAULT TRUE,
    certificate_template_id BIGINT,
    
    -- Dates
    published_at TIMESTAMP NULL,
    start_date DATE,
    end_date DATE,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (center_id) REFERENCES centers(id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL,
    
    INDEX idx_slug (slug),
    INDEX idx_center (center_id),
    INDEX idx_category (category_id),
    INDEX idx_instructor (instructor_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_price (price),
    INDEX idx_rating (average_rating),
    FULLTEXT idx_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `lessons`
**Mô tả**: Bài học trong khóa học

```sql
CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    
    -- Info
    title VARCHAR(500) NOT NULL,
    description TEXT,
    
    -- Content
    content_type ENUM('video', 'text', 'quiz', 'assignment', 'file', 'live_session'),
    content_url VARCHAR(1000), -- Video URL, file URL, etc.
    text_content LONGTEXT, -- HTML content cho text lessons
    duration_minutes INT DEFAULT 0,
    
    -- Organization
    section_id BIGINT, -- Nhóm lessons theo sections/modules
    order_number INT DEFAULT 0,
    
    -- Access
    is_preview BOOLEAN DEFAULT FALSE, -- Cho xem free
    is_required BOOLEAN DEFAULT TRUE,
    
    -- Resources
    resources TEXT, -- JSON array of downloadable resources
    
    -- Status
    is_published BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_section (section_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `sections`
**Mô tả**: Sections/Modules trong khóa học

```sql
CREATE TABLE sections (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_number INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `enrollments`
**Mô tả**: Đăng ký học

```sql
CREATE TABLE enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    
    -- Status
    status ENUM('pending', 'active', 'completed', 'cancelled', 'expired') DEFAULT 'pending',
    
    -- Progress
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    completed_lessons INT DEFAULT 0,
    total_lessons INT DEFAULT 0,
    
    -- Certificate
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_issued_at TIMESTAMP NULL,
    
    -- Dates
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL, -- Cho khóa có thời hạn
    
    -- Payment
    payment_id BIGINT, -- Link to payment
    amount_paid DECIMAL(10,2) DEFAULT 0.00,
    
    -- Rating (after completion)
    has_reviewed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `lesson_progress`
**Mô tả**: Tiến độ học từng bài

```sql
CREATE TABLE lesson_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    
    -- Progress
    is_completed BOOLEAN DEFAULT FALSE,
    completion_percentage INT DEFAULT 0,
    time_spent_seconds INT DEFAULT 0, -- Thời gian học
    
    -- Video progress (if video lesson)
    last_position_seconds INT DEFAULT 0,
    
    -- Dates
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_progress (enrollment_id, lesson_id),
    INDEX idx_enrollment (enrollment_id),
    INDEX idx_lesson (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `reviews`
**Mô tả**: Đánh giá khóa học

```sql
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    enrollment_id BIGINT,
    
    -- Rating
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Review
    title VARCHAR(255),
    comment TEXT,
    
    -- Helpful votes
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    
    -- Moderation
    is_approved BOOLEAN DEFAULT TRUE,
    is_reported BOOLEAN DEFAULT FALSE,
    moderated_by BIGINT,
    moderated_at TIMESTAMP NULL,
    
    -- Response from instructor/admin
    response TEXT,
    response_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_review (course_id, user_id),
    INDEX idx_course (course_id),
    INDEX idx_user (user_id),
    INDEX idx_rating (rating),
    INDEX idx_approved (is_approved)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `certificates`
**Mô tả**: Chứng chỉ hoàn thành

```sql
CREATE TABLE certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    
    -- Certificate Info
    certificate_code VARCHAR(50) NOT NULL UNIQUE, -- MK-2025-XXXXX
    certificate_url VARCHAR(500), -- PDF URL
    
    -- Verification
    is_valid BOOLEAN DEFAULT TRUE,
    verification_url VARCHAR(500),
    
    -- Dates
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL, -- NULL = không hết hạn
    
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    
    INDEX idx_code (certificate_code),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.3. CONTENT MANAGEMENT (CMS)

##### Bảng: `post_categories`
**Mô tả**: Danh mục bài viết/tin tức

```sql
CREATE TABLE post_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id BIGINT NULL,
    color VARCHAR(7),
    icon VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES post_categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mặc định
INSERT INTO post_categories (name, slug, display_order) VALUES
('Tin hoạt động', 'tin-hoat-dong', 1),
('Tin tuyển dụng', 'tin-tuyen-dung', 2),
('Tin giáo dục', 'tin-giao-duc', 3),
('Sự kiện', 'su-kien', 4),
('Thông báo', 'thong-bao', 5);
```

##### Bảng: `posts`
**Mô tả**: Bài viết, tin tức

```sql
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    
    -- Media
    featured_image_url VARCHAR(500),
    gallery_images TEXT, -- JSON array
    
    -- Organization
    category_id BIGINT,
    author_id BIGINT NOT NULL,
    
    -- Status
    status ENUM('draft', 'pending_review', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    
    -- Stats
    view_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Dates
    published_at TIMESTAMP NULL,
    scheduled_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (category_id) REFERENCES post_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id),
    
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id),
    INDEX idx_status (status),
    INDEX idx_published (published_at),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `tags`
**Mô tả**: Tags cho posts

```sql
CREATE TABLE tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    usage_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `post_tags`
**Mô tả**: Mapping giữa posts và tags

```sql
CREATE TABLE post_tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_post_tag (post_id, tag_id),
    INDEX idx_post (post_id),
    INDEX idx_tag (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `media`
**Mô tả**: Thư viện media (images, videos, files)

```sql
CREATE TABLE media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- File Info
    filename VARCHAR(500) NOT NULL,
    original_filename VARCHAR(500),
    file_path VARCHAR(1000) NOT NULL,
    file_url VARCHAR(1000) NOT NULL,
    file_size BIGINT, -- bytes
    mime_type VARCHAR(100),
    
    -- Type
    type ENUM('image', 'video', 'audio', 'document', 'other') NOT NULL,
    
    -- Image specific
    width INT,
    height INT,
    thumbnail_url VARCHAR(1000),
    
    -- Video specific
    duration_seconds INT,
    video_thumbnail_url VARCHAR(1000),
    
    -- Metadata
    title VARCHAR(500),
    alt_text VARCHAR(500),
    description TEXT,
    
    -- Ownership
    uploaded_by BIGINT NOT NULL,
    folder VARCHAR(255), -- Organize trong folders
    
    -- Usage
    usage_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    
    INDEX idx_type (type),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_folder (folder)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `galleries`
**Mô tả**: Album hình ảnh

```sql
CREATE TABLE galleries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    cover_image_url VARCHAR(500),
    
    -- Type
    type ENUM('photos', 'videos', 'mixed') DEFAULT 'photos',
    
    -- Stats
    total_items INT DEFAULT 0,
    view_count INT DEFAULT 0,
    
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_slug (slug),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `gallery_items`
**Mô tả**: Items trong gallery

```sql
CREATE TABLE gallery_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    gallery_id BIGINT NOT NULL,
    media_id BIGINT NOT NULL,
    
    title VARCHAR(500),
    description TEXT,
    order_number INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    
    INDEX idx_gallery (gallery_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.4. JOB & CAREER (MEKONG JOB)

##### Bảng: `companies`
**Mô tả**: Công ty tuyển dụng

```sql
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
    industry VARCHAR(255), -- Ngành nghề
    company_size VARCHAR(50), -- '1-10', '11-50', '51-200', '201-500', '500+'
    founded_year INT,
    
    -- Ownership
    owner_id BIGINT, -- User with EMPLOYER role
    
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `jobs`
**Mô tả**: Tin tuyển dụng

```sql
CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    posted_by BIGINT NOT NULL,
    
    -- Job Info
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description LONGTEXT,
    requirements TEXT, -- JSON array
    benefits TEXT, -- JSON array
    
    -- Job Details
    job_type ENUM('full_time', 'part_time', 'contract', 'internship', 'freelance'),
    level VARCHAR(100), -- 'entry', 'junior', 'senior', 'manager', 'director'
    experience_years VARCHAR(50), -- '0-1', '1-3', '3-5', '5+'
    
    -- Location
    location TEXT, -- Can be multiple locations (JSON array)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `resumes` / `cvs`
**Mô tả**: CV của ứng viên

```sql
CREATE TABLE resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- CV Info
    title VARCHAR(500) NOT NULL, -- 'CV Marketing Manager', 'CV Developer'
    
    -- Personal (từ profile, nhưng có thể override)
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    
    -- Professional
    headline VARCHAR(500),
    summary TEXT,
    objective TEXT,
    
    -- Experience (JSON array of work experiences)
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
    cv_file_url VARCHAR(500), -- PDF upload
    
    -- Preferences
    job_preferences TEXT, -- JSON: desired position, salary, location
    
    -- Privacy
    is_public BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `job_applications`
**Mô tả**: Đơn ứng tuyển

```sql
CREATE TABLE job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    resume_id BIGINT,
    
    -- Application Info
    cover_letter TEXT,
    expected_salary DECIMAL(12,2),
    available_from DATE,
    
    -- Attachments (JSON array of file URLs)
    attachments TEXT,
    
    -- Status
    status ENUM('pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn') DEFAULT 'pending',
    
    -- Employer actions
    viewed_at TIMESTAMP NULL,
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP NULL,
    notes TEXT, -- Internal notes from employer
    
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
    
    UNIQUE KEY unique_application (job_id, user_id), -- Chỉ apply 1 lần
    INDEX idx_job (job_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.5. PAYMENT & TRANSACTION

##### Bảng: `payments`
**Mô tả**: Thanh toán

```sql
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- Payment Info
    payment_code VARCHAR(100) NOT NULL UNIQUE, -- MK-PAY-20250115-XXXXX
    
    -- Amount
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'VND',
    
    -- Payment Method
    payment_method ENUM('vnpay', 'momo', 'bank_transfer', 'cash', 'crypto') NOT NULL,
    
    -- Payment Gateway Response
    gateway_transaction_id VARCHAR(255), -- Transaction ID từ VNPay, Momo
    gateway_response TEXT, -- JSON response from gateway
    
    -- Purpose
    payment_type ENUM('course_enrollment', 'job_posting', 'subscription', 'book_purchase', 'space_rental', 'other'),
    reference_type VARCHAR(50), -- 'course', 'job_package', 'subscription'
    reference_id BIGINT, -- ID của course, job package, etc.
    
    -- Status
    status ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled') DEFAULT 'pending',
    
    -- Dates
    paid_at TIMESTAMP NULL,
    refunded_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL, -- For pending payments
    
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
    INDEX idx_type (payment_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `transactions`
**Mô tả**: Lịch sử giao dịch chi tiết

```sql
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `coupons` / `vouchers`
**Mô tả**: Mã giảm giá

```sql
CREATE TABLE coupons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Coupon Info
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    
    -- Discount
    discount_type ENUM('percentage', 'fixed_amount') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    max_discount_amount DECIMAL(10,2), -- For percentage type
    
    -- Conditions
    min_purchase_amount DECIMAL(10,2),
    applicable_to ENUM('all', 'course', 'center', 'specific_courses') DEFAULT 'all',
    applicable_ids TEXT, -- JSON array of course IDs, center IDs
    
    -- Usage Limits
    usage_limit INT, -- NULL = unlimited
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `coupon_usages`
**Mô tả**: Lịch sử sử dụng coupon

```sql
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
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.6. PARTNER MANAGEMENT

##### Bảng: `partners`
**Mô tả**: Đối tác (Trường ĐH, Tổ chức)

```sql
CREATE TABLE partners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Partner Info
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    type ENUM('university', 'college', 'company', 'government', 'ngo', 'other') NOT NULL,
    description TEXT,
    
    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(500),
    address TEXT,
    city VARCHAR(100),
    
    -- Media
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    
    -- Partnership
    partnership_since DATE,
    partnership_type VARCHAR(255), -- 'Training', 'Recruitment', 'Research'
    
    -- Contact Person
    contact_person_name VARCHAR(255),
    contact_person_title VARCHAR(255),
    contact_person_email VARCHAR(255),
    contact_person_phone VARCHAR(20),
    
    -- Status
    status ENUM('pending', 'active', 'inactive', 'suspended') DEFAULT 'pending',
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Owner
    user_id BIGINT, -- Link to PARTNER role user
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_slug (slug),
    INDEX idx_type (type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.7. COMMUNICATION

##### Bảng: `contacts`
**Mô tả**: Liên hệ từ form

```sql
CREATE TABLE contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Contact Info
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    
    -- Message
    subject VARCHAR(500),
    message TEXT NOT NULL,
    
    -- Type
    contact_type VARCHAR(100), -- 'general', 'support', 'partnership', 'sales'
    
    -- Status
    status ENUM('new', 'read', 'replied', 'resolved', 'spam') DEFAULT 'new',
    
    -- Response
    reply_message TEXT,
    replied_by BIGINT,
    replied_at TIMESTAMP NULL,
    
    -- User (if logged in)
    user_id BIGINT,
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_status (status),
    INDEX idx_type (contact_type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `newsletters`
**Mô tả**: Đăng ký nhận newsletter

```sql
CREATE TABLE newsletters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    
    -- Info
    name VARCHAR(255),
    
    -- Status
    status ENUM('subscribed', 'unsubscribed', 'bounced') DEFAULT 'subscribed',
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verified_at TIMESTAMP NULL,
    
    -- Preferences
    preferences JSON, -- Interested topics, frequency
    
    -- Dates
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    
    -- User link
    user_id BIGINT,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `notifications`
**Mô tả**: Thông báo cho user

```sql
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- Notification Info
    type VARCHAR(50) NOT NULL, -- 'enrollment', 'payment', 'certificate', 'message', 'job_application'
    title VARCHAR(500),
    message TEXT,
    
    -- Action
    action_url VARCHAR(500), -- Link để click vào
    action_text VARCHAR(100), -- 'View Course', 'Download Certificate'
    
    -- Reference
    reference_type VARCHAR(50),
    reference_id BIGINT,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    
    -- Delivery
    sent_via ENUM('in_app', 'email', 'push', 'sms'),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3.8. ANALYTICS & LOGS

##### Bảng: `analytics_events`
**Mô tả**: Theo dõi hành vi người dùng

```sql
CREATE TABLE analytics_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- User
    user_id BIGINT,
    session_id VARCHAR(255),
    
    -- Event
    event_type VARCHAR(100) NOT NULL, -- 'page_view', 'course_view', 'enrollment', 'video_watch'
    event_category VARCHAR(100),
    event_action VARCHAR(100),
    event_label VARCHAR(255),
    
    -- Resource
    resource_type VARCHAR(50), -- 'course', 'post', 'job'
    resource_id BIGINT,
    
    -- Metadata
    properties JSON, -- Additional event data
    
    -- Context
    url VARCHAR(1000),
    referrer VARCHAR(1000),
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
    browser VARCHAR(100),
    os VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_event (event_type),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `audit_logs`
**Mô tả**: Log các thay đổi quan trọng

```sql
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- User
    user_id BIGINT,
    
    -- Action
    action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout'
    resource_type VARCHAR(100) NOT NULL, -- 'user', 'course', 'payment'
    resource_id BIGINT,
    
    -- Changes
    old_values JSON, -- Giá trị cũ
    new_values JSON, -- Giá trị mới
    
    -- Context
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

##### Bảng: `system_logs`
**Mô tả**: System logs, errors

```sql
CREATE TABLE system_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Log Level
    level ENUM('DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL') NOT NULL,
    
    -- Message
    logger VARCHAR(255),
    message TEXT,
    exception TEXT, -- Stack trace if error
    
    -- Context
    context JSON,
    user_id BIGINT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_level (level),
    INDEX idx_logger (logger),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3.4. Database Indexes & Optimization

#### 3.4.1. Composite Indexes

```sql
-- Users - Search by email and status
CREATE INDEX idx_users_email_status ON users(email, is_active, is_verified);

-- Courses - Filter and sort
CREATE INDEX idx_courses_center_status_published ON courses(center_id, status, published_at DESC);
CREATE INDEX idx_courses_price_rating ON courses(price ASC, average_rating DESC);

-- Enrollments - User courses with status
CREATE INDEX idx_enrollments_user_status ON enrollments(user_id, status, enrolled_at DESC);

-- Posts - Published posts by category
CREATE INDEX idx_posts_published_category ON posts(status, published_at DESC, category_id);

-- Jobs - Active jobs by location
CREATE INDEX idx_jobs_active_location ON jobs(status, city, published_at DESC);

-- Payments - User transactions
CREATE INDEX idx_payments_user_status ON payments(user_id, status, created_at DESC);
```

#### 3.4.2. Partitioning Strategy (For large tables)

```sql
-- Partition analytics_events by month
ALTER TABLE analytics_events
PARTITION BY RANGE (TO_DAYS(created_at)) (
    PARTITION p202501 VALUES LESS THAN (TO_DAYS('2025-02-01')),
    PARTITION p202502 VALUES LESS THAN (TO_DAYS('2025-03-01')),
    -- Add monthly partitions...
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partition audit_logs by quarter
ALTER TABLE audit_logs
PARTITION BY RANGE (TO_DAYS(created_at)) (
    PARTITION p2025q1 VALUES LESS THAN (TO_DAYS('2025-04-01')),
    PARTITION p2025q2 VALUES LESS THAN (TO_DAYS('2025-07-01')),
    -- Add quarterly partitions...
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

#### 3.4.3. Database Views

```sql
-- View: Active courses with instructor info
CREATE VIEW v_active_courses AS
SELECT 
    c.*,
    i.title as instructor_title,
    i.short_bio as instructor_bio,
    u.email as instructor_email,
    p.full_name as instructor_name,
    p.avatar_url as instructor_avatar,
    cnt.name as center_name,
    cnt.slug as center_slug,
    cat.name as category_name
FROM courses c
LEFT JOIN instructors i ON c.instructor_id = i.id
LEFT JOIN users u ON i.user_id = u.id
LEFT JOIN profiles p ON u.id = p.user_id
LEFT JOIN centers cnt ON c.center_id = cnt.id
LEFT JOIN categories cat ON c.category_id = cat.id
WHERE c.status = 'published' AND c.deleted_at IS NULL;

-- View: User enrollments with progress
CREATE VIEW v_user_enrollments AS
SELECT 
    e.*,
    c.title as course_title,
    c.thumbnail_url as course_thumbnail,
    c.duration_hours,
    i.title as instructor_title,
    p.full_name as instructor_name,
    CASE 
        WHEN e.progress_percentage = 100 THEN 'completed'
        WHEN e.progress_percentage > 0 THEN 'in_progress'
        ELSE 'not_started'
    END as learning_status
FROM enrollments e
JOIN courses c ON e.course_id = c.id
LEFT JOIN instructors i ON c.instructor_id = i.id
LEFT JOIN users u ON i.user_id = u.id
LEFT JOIN profiles p ON u.id = p.user_id;

-- View: Job listings with company info
CREATE VIEW v_active_jobs AS
SELECT 
    j.*,
    co.name as company_name,
    co.logo_url as company_logo,
    co.city as company_city,
    co.industry as company_industry
FROM jobs j
JOIN companies co ON j.company_id = co.id
WHERE j.status = 'active' 
AND (j.expires_at IS NULL OR j.expires_at > NOW());
```

---

## 4. API Endpoints

### 4.1. Tổng quan API

**Base URL**: `https://api.happyworldmekong.com/api/v1`

**API Convention**:
- RESTful architecture
- HTTP Methods: GET, POST, PUT, PATCH, DELETE
- Response format: JSON
- Authentication: Bearer Token (JWT)
- Pagination: `?page=1&limit=20`
- Sorting: `?sort=created_at:desc`
- Filtering: `?filter[status]=active&filter[price][gte]=100000`

**Standard Response Format**:

```json
// Success Response
{
    "success": true,
    "data": { ... },
    "message": "Operation successful",
    "timestamp": "2025-01-15T10:30:00Z"
}

// Success with Pagination
{
    "success": true,
    "data": [...],
    "pagination": {
        "total": 150,
        "page": 1,
        "limit": 20,
        "totalPages": 8
    }
}

// Error Response
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input data",
        "details": {
            "email": ["Email is already taken"],
            "password": ["Password must be at least 8 characters"]
        }
    },
    "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.2. Authentication & User Management APIs

#### 4.2.1. Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Đăng ký tài khoản mới | ❌ |
| POST | `/auth/login` | Đăng nhập | ❌ |
| POST | `/auth/logout` | Đăng xuất | ✅ |
| POST | `/auth/refresh` | Refresh token | ✅ |
| POST | `/auth/forgot-password` | Quên mật khẩu | ❌ |
| POST | `/auth/reset-password` | Reset mật khẩu | ❌ |
| POST | `/auth/verify-email` | Xác thực email | ❌ |
| POST | `/auth/resend-verification` | Gửi lại email xác thực | ✅ |
| POST | `/auth/change-password` | Đổi mật khẩu | ✅ |
| GET | `/auth/me` | Lấy thông tin user hiện tại | ✅ |
| POST | `/auth/2fa/enable` | Bật 2FA | ✅ |
| POST | `/auth/2fa/verify` | Xác thực 2FA | ✅ |
| POST | `/auth/2fa/disable` | Tắt 2FA | ✅ |

**Example Request - Register**:
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "email": "student@example.com",
    "password": "SecurePass123!",
    "full_name": "Nguyen Van A",
    "phone": "0901234567",
    "role": "STUDENT"
}
```

**Example Response**:
```json
{
    "success": true,
    "data": {
        "user": {
            "id": 123,
            "email": "student@example.com",
            "full_name": "Nguyen Van A",
            "roles": ["STUDENT"]
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "expiresIn": 3600
    }
}
```

#### 4.2.2. User Management

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/users` | List users | ✅ | ADMIN |
| GET | `/users/:id` | Get user by ID | ✅ | ADMIN, Self |
| PUT | `/users/:id` | Update user | ✅ | ADMIN, Self |
| DELETE | `/users/:id` | Delete user | ✅ | SUPER_ADMIN |
| POST | `/users/:id/roles` | Assign role | ✅ | SUPER_ADMIN |
| DELETE | `/users/:id/roles/:roleId` | Remove role | ✅ | SUPER_ADMIN |
| POST | `/users/:id/lock` | Lock account | ✅ | ADMIN |
| POST | `/users/:id/unlock` | Unlock account | ✅ | ADMIN |
| GET | `/users/:id/activity` | User activity log | ✅ | ADMIN, Self |

#### 4.2.3. Profile Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get own profile | ✅ |
| PUT | `/profile` | Update profile | ✅ |
| POST | `/profile/avatar` | Upload avatar | ✅ |
| DELETE | `/profile/avatar` | Remove avatar | ✅ |
| POST | `/profile/cover` | Upload cover image | ✅ |
| GET | `/profile/stats` | Profile statistics | ✅ |

### 4.3. Course APIs

#### 4.3.1. Public Course APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/courses` | List courses | ❌ |
| GET | `/courses/featured` | Featured courses | ❌ |
| GET | `/courses/:slug` | Get course details | ❌ |
| GET | `/courses/:id/lessons` | List lessons (preview only) | ❌ |
| GET | `/courses/:id/reviews` | Get reviews | ❌ |
| GET | `/courses/search` | Search courses | ❌ |
| GET | `/categories` | List categories | ❌ |
| GET | `/categories/:slug/courses` | Courses by category | ❌ |

**Query Parameters for `/courses`**:
```
?page=1
&limit=20
&center_id=1
&category_id=5
&level=beginner
&price[gte]=0&price[lte]=5000000
&is_free=true
&delivery_mode=online
&sort=price:asc
&search=marketing
```

**Example Response**:
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "Khóa học Marketing Online toàn diện",
            "slug": "khoa-hoc-marketing-online-toan-dien",
            "thumbnail_url": "https://...",
            "price": 2100000,
            "original_price": 3000000,
            "discount_percentage": 30,
            "level": "beginner",
            "duration_hours": 40,
            "total_students": 1245,
            "average_rating": 4.8,
            "total_reviews": 520,
            "instructor": {
                "id": 10,
                "name": "Nguyễn Văn Giảng",
                "title": "Thạc sĩ",
                "avatar_url": "https://..."
            },
            "center": {
                "id": 1,
                "name": "Mekong Skills Pro",
                "slug": "mekong-skills-pro"
            }
        }
    ],
    "pagination": {
        "total": 150,
        "page": 1,
        "limit": 20,
        "totalPages": 8
    }
}
```

#### 4.3.2. Course Management APIs (Admin/Instructor)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/courses` | Create course | ✅ | ADMIN, CENTER_MANAGER |
| PUT | `/courses/:id` | Update course | ✅ | ADMIN, INSTRUCTOR* |
| DELETE | `/courses/:id` | Delete course | ✅ | ADMIN |
| POST | `/courses/:id/publish` | Publish course | ✅ | ADMIN |
| POST | `/courses/:id/unpublish` | Unpublish course | ✅ | ADMIN |
| POST | `/courses/:id/lessons` | Add lesson | ✅ | ADMIN, INSTRUCTOR* |
| PUT | `/courses/:courseId/lessons/:id` | Update lesson | ✅ | ADMIN, INSTRUCTOR* |
| DELETE | `/courses/:courseId/lessons/:id` | Delete lesson | ✅ | ADMIN |
| POST | `/courses/:id/sections` | Add section | ✅ | ADMIN, INSTRUCTOR* |
| PUT | `/sections/:id` | Update section | ✅ | ADMIN, INSTRUCTOR* |
| DELETE | `/sections/:id` | Delete section | ✅ | ADMIN |

*\* Instructor: chỉ own courses*

### 4.4. Enrollment & Learning APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/enrollments` | Enroll course | ✅ |
| GET | `/enrollments` | My enrollments | ✅ |
| GET | `/enrollments/:id` | Enrollment details | ✅ |
| GET | `/enrollments/:id/progress` | Learning progress | ✅ |
| PUT | `/enrollments/:id/lessons/:lessonId/complete` | Mark lesson complete | ✅ |
| POST | `/enrollments/:id/lessons/:lessonId/progress` | Update lesson progress | ✅ |
| GET | `/enrollments/:id/certificate` | Get certificate | ✅ |
| POST | `/enrollments/:id/cancel` | Cancel enrollment | ✅ |

**Example - Update Lesson Progress**:
```http
POST /api/v1/enrollments/123/lessons/456/progress
Authorization: Bearer <token>

{
    "completion_percentage": 75,
    "time_spent_seconds": 1800,
    "last_position_seconds": 450
}
```

### 4.5. Review APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/courses/:id/reviews` | Create review | ✅ |
| PUT | `/reviews/:id` | Update review | ✅ |
| DELETE | `/reviews/:id` | Delete review | ✅ |
| POST | `/reviews/:id/helpful` | Mark as helpful | ✅ |
| POST | `/reviews/:id/report` | Report review | ✅ |
| POST | `/reviews/:id/response` | Instructor response | ✅ |

### 4.6. Instructor APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/instructors` | List instructors | ❌ |
| GET | `/instructors/:id` | Instructor details | ❌ |
| GET | `/instructors/:id/courses` | Instructor's courses | ❌ |
| GET | `/instructors/featured` | Featured instructors | ❌ |
| PUT | `/instructors/profile` | Update instructor profile | ✅ |
| GET | `/instructors/dashboard` | Instructor dashboard | ✅ |
| GET | `/instructors/students` | My students | ✅ |
| GET | `/instructors/earnings` | Earnings report | ✅ |

### 4.7. Post/News APIs

#### 4.7.1. Public APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | List posts | ❌ |
| GET | `/posts/:slug` | Post details | ❌ |
| GET | `/posts/featured` | Featured posts | ❌ |
| GET | `/posts/latest` | Latest posts | ❌ |
| GET | `/posts/:id/related` | Related posts | ❌ |
| GET | `/posts/search` | Search posts | ❌ |
| POST | `/posts/:id/view` | Increment view count | ❌ |
| GET | `/post-categories` | List categories | ❌ |
| GET | `/post-categories/:slug/posts` | Posts by category | ❌ |

#### 4.7.2. Admin APIs

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/posts` | Create post | ✅ | ADMIN |
| PUT | `/posts/:id` | Update post | ✅ | ADMIN |
| DELETE | `/posts/:id` | Delete post | ✅ | ADMIN |
| POST | `/posts/:id/publish` | Publish post | ✅ | ADMIN |

### 4.8. Center (Ecosystem) APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/centers` | List centers | ❌ |
| GET | `/centers/:slug` | Center details | ❌ |
| GET | `/centers/:id/courses` | Courses by center | ❌ |
| GET | `/centers/:id/stats` | Center statistics | ✅ |
| PUT | `/centers/:id` | Update center | ✅ |

### 4.9. Job APIs (Mekong Job)

#### 4.9.1. Public Job APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/jobs` | List jobs | ❌ |
| GET | `/jobs/:slug` | Job details | ❌ |
| GET | `/jobs/search` | Search jobs | ❌ |
| GET | `/jobs/featured` | Featured jobs | ❌ |
| GET | `/companies` | List companies | ❌ |
| GET | `/companies/:slug` | Company details | ❌ |
| GET | `/companies/:id/jobs` | Jobs by company | ❌ |

**Query Parameters for `/jobs`**:
```
?page=1
&limit=20
&city=can-tho
&job_type=full_time
&level=junior
&salary[gte]=10000000
&is_remote=true
&sort=published_at:desc
&search=marketing
```

#### 4.9.2. Job Application APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/jobs/:id/apply` | Apply for job | ✅ |
| GET | `/applications` | My applications | ✅ |
| GET | `/applications/:id` | Application details | ✅ |
| PUT | `/applications/:id` | Update application | ✅ |
| DELETE | `/applications/:id` | Withdraw application | ✅ |

#### 4.9.3. Resume/CV APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/resumes` | My resumes | ✅ |
| POST | `/resumes` | Create resume | ✅ |
| GET | `/resumes/:id` | Resume details | ✅ |
| PUT | `/resumes/:id` | Update resume | ✅ |
| DELETE | `/resumes/:id` | Delete resume | ✅ |
| POST | `/resumes/:id/set-default` | Set as default | ✅ |

#### 4.9.4. Employer APIs

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/jobs` | Create job | ✅ | EMPLOYER |
| PUT | `/jobs/:id` | Update job | ✅ | EMPLOYER |
| DELETE | `/jobs/:id` | Delete job | ✅ | EMPLOYER |
| POST | `/jobs/:id/publish` | Publish job | ✅ | EMPLOYER |
| POST | `/jobs/:id/close` | Close job | ✅ | EMPLOYER |
| GET | `/jobs/:id/applications` | Job applications | ✅ | EMPLOYER |
| PUT | `/applications/:id/status` | Update application status | ✅ | EMPLOYER |
| POST | `/companies` | Create company | ✅ | EMPLOYER |
| PUT | `/companies/:id` | Update company | ✅ | EMPLOYER |

### 4.10. Payment APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments/create` | Create payment | ✅ |
| GET | `/payments/:id` | Payment details | ✅ |
| GET | `/payments` | My payments | ✅ |
| POST | `/payments/:id/confirm` | Confirm payment | ✅ |
| POST | `/payments/:id/cancel` | Cancel payment | ✅ |
| POST | `/payments/vnpay/callback` | VNPay callback | ❌ |
| POST | `/payments/momo/callback` | Momo callback | ❌ |
| POST | `/payments/:id/refund` | Request refund | ✅ |

**Example - Create Payment**:
```http
POST /api/v1/payments/create
Authorization: Bearer <token>

{
    "payment_type": "course_enrollment",
    "reference_id": 123,
    "amount": 2100000,
    "payment_method": "vnpay",
    "coupon_code": "NEWYEAR2025"
}
```

**Response**:
```json
{
    "success": true,
    "data": {
        "payment_id": 789,
        "payment_code": "MK-PAY-20250115-789",
        "amount": 1890000,
        "discount_amount": 210000,
        "payment_url": "https://vnpay.vn/payment/...",
        "expires_at": "2025-01-15T11:30:00Z"
    }
}
```

### 4.11. Coupon/Voucher APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/coupons/validate` | Validate coupon | ✅ |
| GET | `/coupons/my-coupons` | My available coupons | ✅ |
| POST | `/admin/coupons` | Create coupon | ✅ |
| GET | `/admin/coupons` | List coupons | ✅ |
| PUT | `/admin/coupons/:id` | Update coupon | ✅ |
| DELETE | `/admin/coupons/:id` | Delete coupon | ✅ |

### 4.12. Contact & Communication APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/contact` | Submit contact form | ❌ |
| POST | `/newsletter/subscribe` | Subscribe newsletter | ❌ |
| POST | `/newsletter/unsubscribe` | Unsubscribe | ❌ |
| GET | `/notifications` | My notifications | ✅ |
| PUT | `/notifications/:id/read` | Mark as read | ✅ |
| PUT | `/notifications/read-all` | Mark all as read | ✅ |
| DELETE | `/notifications/:id` | Delete notification | ✅ |

### 4.13. Media & Gallery APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/media/upload` | Upload file | ✅ |
| GET | `/media` | List media | ✅ |
| DELETE | `/media/:id` | Delete media | ✅ |
| GET | `/galleries` | List galleries | ❌ |
| GET | `/galleries/:slug` | Gallery details | ❌ |
| POST | `/admin/galleries` | Create gallery | ✅ |
| PUT | `/admin/galleries/:id` | Update gallery | ✅ |
| POST | `/admin/galleries/:id/items` | Add items | ✅ |

### 4.14. Partner APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/partners` | List partners | ❌ |
| GET | `/partners/:slug` | Partner details | ❌ |
| POST | `/partners/request` | Request partnership | ✅ |
| PUT | `/partners/:id` | Update partner | ✅ |
| POST | `/admin/partners` | Create partner | ✅ |
| PUT | `/admin/partners/:id/approve` | Approve partner | ✅ |

### 4.15. Analytics & Statistics APIs

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/analytics/track` | Track event | ❌ |
| GET | `/analytics/dashboard` | Dashboard stats | ✅ | ADMIN |
| GET | `/analytics/courses` | Course statistics | ✅ | ADMIN |
| GET | `/analytics/revenue` | Revenue report | ✅ | ADMIN |
| GET | `/analytics/users` | User statistics | ✅ | ADMIN |
| GET | `/analytics/enrollments` | Enrollment trends | ✅ | ADMIN |
| GET | `/analytics/jobs` | Job statistics | ✅ | ADMIN |

### 4.16. Admin Dashboard APIs

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/admin/dashboard` | Admin dashboard | ✅ | ADMIN |
| GET | `/admin/stats/overview` | Overview statistics | ✅ | ADMIN |
| GET | `/admin/recent-activities` | Recent activities | ✅ | ADMIN |
| GET | `/admin/reports/daily` | Daily report | ✅ | ADMIN |
| GET | `/admin/reports/monthly` | Monthly report | ✅ | ADMIN |
| POST | `/admin/export/users` | Export users CSV | ✅ | ADMIN |
| POST | `/admin/export/enrollments` | Export enrollments | ✅ | ADMIN |
| POST | `/admin/export/payments` | Export payments | ✅ | ADMIN |

### 4.17. System & Settings APIs

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/settings` | Get settings | ✅ | ADMIN |
| PUT | `/settings` | Update settings | ✅ | SUPER_ADMIN |
| GET | `/health` | Health check | ❌ | - |
| GET | `/version` | API version | ❌ | - |
| POST | `/admin/cache/clear` | Clear cache | ✅ | SUPER_ADMIN |
| GET | `/admin/logs` | System logs | ✅ | SUPER_ADMIN |

### 4.18. Search APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/search` | Global search | ❌ |
| GET | `/search/courses` | Search courses | ❌ |
| GET | `/search/posts` | Search posts | ❌ |
| GET | `/search/jobs` | Search jobs | ❌ |
| GET | `/search/instructors` | Search instructors | ❌ |

**Example - Global Search**:
```http
GET /api/v1/search?q=marketing&type=courses,posts&limit=10
```

**Response**:
```json
{
    "success": true,
    "data": {
        "courses": [...],
        "posts": [...],
        "total": 45
    }
}
```

### 4.19. Certificate APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/certificates` | My certificates | ✅ |
| GET | `/certificates/:code` | Get certificate by code | ❌ |
| GET | `/certificates/:id/download` | Download certificate PDF | ✅ |
| GET | `/certificates/:code/verify` | Verify certificate | ❌ |
| POST | `/admin/certificates/issue` | Issue certificate | ✅ |

### 4.20. Webhook APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/webhooks/vnpay` | VNPay webhook | ❌ |
| POST | `/webhooks/momo` | Momo webhook | ❌ |
| POST | `/webhooks/email-status` | Email delivery status | ❌ |

---

## 5. Entity & DTO Models

### 5.1. Entity Classes (JPA)

#### 5.1.1. User Entity

```java
package com.happyworld.mekong.entity;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class User extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(unique = true)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    private String phone;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "is_locked")
    private Boolean isLocked = false;
    
    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts = 0;
    
    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;
    
    @Column(name = "last_login_ip", length = 45)
    private String lastLoginIp;
    
    @Column(name = "two_factor_enabled")
    private Boolean twoFactorEnabled = false;
    
    @Column(name = "two_factor_secret")
    private String twoFactorSecret;
    
    @Column(name = "oauth_provider", length = 50)
    private String oauthProvider;
    
    @Column(name = "oauth_id")
    private String oauthId;
    
    @Column(name = "email_verification_token")
    private String emailVerificationToken;
    
    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;
    
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    
    @Column(name = "password_reset_expires_at")
    private LocalDateTime passwordResetExpiresAt;
    
    // Relationships
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Profile profile;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Enrollment> enrollments = new HashSet<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Payment> payments = new HashSet<>();
}
```

#### 5.1.2. Course Entity

```java
package com.happyworld.mekong.entity;

import lombok.*;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class Course extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 500, nullable = false)
    private String title;
    
    @Column(length = 500, unique = true, nullable = false)
    private String slug;
    
    @Column(length = 500)
    private String subtitle;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "what_you_will_learn", columnDefinition = "TEXT")
    private String whatYouWillLearn; // JSON array
    
    @Column(columnDefinition = "TEXT")
    private String requirements; // JSON array
    
    @Column(name = "target_audience", columnDefinition = "TEXT")
    private String targetAudience; // JSON array
    
    // Organization
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id", nullable = false)
    private Center center;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    
    // Media
    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;
    
    @Column(name = "preview_video_url", length = 500)
    private String previewVideoUrl;
    
    // Pricing
    @Column(precision = 10, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;
    
    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;
    
    @Column(name = "discount_percentage")
    private Integer discountPercentage = 0;
    
    @Column(name = "is_free")
    private Boolean isFree = false;
    
    // Course Info
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CourseLevel level = CourseLevel.ALL_LEVELS;
    
    @Column(length = 10)
    private String language = "vi";
    
    @Column(name = "duration_hours")
    private Integer durationHours;
    
    @Column(name = "total_lessons")
    private Integer totalLessons = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_mode", length = 20)
    private DeliveryMode deliveryMode = DeliveryMode.ONLINE;
    
    // Status
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CourseStatus status = CourseStatus.DRAFT;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(name = "is_bestseller")
    private Boolean isBestseller = false;
    
    // Stats
    @Column(name = "total_students")
    private Integer totalStudents = 0;
    
    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;
    
    @Column(name = "total_reviews")
    private Integer totalReviews = 0;
    
    @Column(name = "total_views")
    private Integer totalViews = 0;
    
    // Certificate
    @Column(name = "has_certificate")
    private Boolean hasCertificate = true;
    
    // Dates
    @Column(name = "published_at")
    private LocalDateTime publishedAt;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    // SEO
    @Column(name = "meta_title")
    private String metaTitle;
    
    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;
    
    @Column(name = "meta_keywords", columnDefinition = "TEXT")
    private String metaKeywords;
    
    // Relationships
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Section> sections = new HashSet<>();
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Lesson> lessons = new HashSet<>();
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Enrollment> enrollments = new HashSet<>();
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Review> reviews = new HashSet<>();
    
    // Enums
    public enum CourseLevel {
        BEGINNER, INTERMEDIATE, ADVANCED, ALL_LEVELS
    }
    
    public enum DeliveryMode {
        ONLINE, OFFLINE, HYBRID
    }
    
    public enum CourseStatus {
        DRAFT, PENDING_REVIEW, PUBLISHED, ARCHIVED
    }
}
```

#### 5.1.3. Enrollment Entity

```java
package com.happyworld.mekong.entity;

import lombok.*;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "enrollments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class Enrollment extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EnrollmentStatus status = EnrollmentStatus.PENDING;
    
    @Column(name = "progress_percentage", precision = 5, scale = 2)
    private BigDecimal progressPercentage = BigDecimal.ZERO;
    
    @Column(name = "completed_lessons")
    private Integer completedLessons = 0;
    
    @Column(name = "total_lessons")
    private Integer totalLessons = 0;
    
    @Column(name = "certificate_issued")
    private Boolean certificateIssued = false;
    
    @Column(name = "certificate_issued_at")
    private LocalDateTime certificateIssuedAt;
    
    @Column(name = "enrolled_at")
    private LocalDateTime enrolledAt;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(name = "expires_at")
    private LocalDateTime expiresAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private Payment payment;
    
    @Column(name = "amount_paid", precision = 10, scale = 2)
    private BigDecimal amountPaid = BigDecimal.ZERO;
    
    @Column(name = "has_reviewed")
    private Boolean hasReviewed = false;
    
    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL)
    private Set<LessonProgress> lessonProgresses = new HashSet<>();
    
    public enum EnrollmentStatus {
        PENDING, ACTIVE, COMPLETED, CANCELLED, EXPIRED
    }
}
```

### 5.2. DTO Classes (Request/Response)

#### 5.2.1. Authentication DTOs

```java
// LoginRequest.java
package com.happyworld.mekong.dto.request;

import lombok.Data;
import javax.validation.constraints.*;

@Data
public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    
    private String twoFactorCode;
}

// RegisterRequest.java
@Data
public class RegisterRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be 8-100 characters")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
        message = "Password must contain uppercase, lowercase and number"
    )
    private String password;
    
    @NotBlank(message = "Full name is required")
    @Size(max = 255)
    private String fullName;
    
    @Pattern(regexp = "^0\\d{9}$", message = "Invalid phone number")
    private String phone;
    
    private String role = "STUDENT";
}

// AuthResponse.java
package com.happyworld.mekong.dto.response;

import lombok.*;

@Data
@Builder
public class AuthResponse {
    private UserResponse user;
    private String token;
    private String refreshToken;
    private Long expiresIn;
    private String tokenType = "Bearer";
}
```

#### 5.2.2. Course DTOs

```java
// CourseCreateRequest.java
package com.happyworld.mekong.dto.request;

import lombok.Data;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CourseCreateRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 500)
    private String title;
    
    @Size(max = 500)
    private String subtitle;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    private List<String> whatYouWillLearn;
    private List<String> requirements;
    private List<String> targetAudience;
    
    @NotNull(message = "Center is required")
    private Long centerId;
    
    private Long categoryId;
    private Long instructorId;
    
    private String thumbnailUrl;
    private String previewVideoUrl;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be >= 0")
    private BigDecimal price;
    
    private BigDecimal originalPrice;
    
    @Min(0) @Max(100)
    private Integer discountPercentage;
    
    private Boolean isFree = false;
    
    @NotNull(message = "Level is required")
    private String level;
    
    private String language = "vi";
    private Integer durationHours;
    
    @NotNull(message = "Delivery mode is required")
    private String deliveryMode;
    
    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
}

// CourseResponse.java
package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class CourseResponse {
    private Long id;
    private String title;
    private String slug;
    private String subtitle;
    private String description;
    private List<String> whatYouWillLearn;
    
    private CenterBasicResponse center;
    private CategoryResponse category;
    private InstructorBasicResponse instructor;
    
    private String thumbnailUrl;
    private String previewVideoUrl;
    
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discountPercentage;
    private Boolean isFree;
    
    private String level;
    private String language;
    private Integer durationHours;
    private Integer totalLessons;
    private String deliveryMode;
    
    private String status;
    private Boolean isFeatured;
    private Boolean isBestseller;
    
    private Integer totalStudents;
    private BigDecimal averageRating;
    private Integer totalReviews;
    private Integer totalViews;
    
    private Boolean hasCertificate;
    private LocalDateTime publishedAt;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

#### 5.2.3. Enrollment DTOs

```java
// EnrollmentRequest.java
package com.happyworld.mekong.dto.request;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class EnrollmentRequest {
    @NotNull(message = "Course ID is required")
    private Long courseId;
    
    private Long paymentId;
    private String couponCode;
}

// EnrollmentResponse.java
package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class EnrollmentResponse {
    private Long id;
    private UserBasicResponse user;
    private CourseBasicResponse course;
    
    private String status;
    private BigDecimal progressPercentage;
    private Integer completedLessons;
    private Integer totalLessons;
    
    private Boolean certificateIssued;
    private LocalDateTime certificateIssuedAt;
    
    private LocalDateTime enrolledAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    
    private BigDecimal amountPaid;
    private Boolean hasReviewed;
}
```

#### 5.2.4. Payment DTOs

```java
// PaymentCreateRequest.java
package com.happyworld.mekong.dto.request;

import lombok.Data;
import javax.validation.constraints.*;
import java.math.BigDecimal;

@Data
public class PaymentCreateRequest {
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be > 0")
    private BigDecimal amount;
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // vnpay, momo, bank_transfer
    
    @NotBlank(message = "Payment type is required")
    private String paymentType; // course_enrollment, job_posting, etc.
    
    @NotNull(message = "Reference ID is required")
    private Long referenceId;
    
    private String couponCode;
    
    private String returnUrl;
    private String cancelUrl;
}

// PaymentResponse.java
package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {
    private Long id;
    private String paymentCode;
    
    private BigDecimal amount;
    private String currency;
    private BigDecimal discountAmount;
    private BigDecimal finalAmount;
    
    private String paymentMethod;
    private String paymentType;
    private String status;
    
    private String paymentUrl; // For redirecting to payment gateway
    
    private String gatewayTransactionId;
    
    private LocalDateTime paidAt;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
}
```

### 5.3. Common DTOs

```java
// ApiResponse.java
package com.happyworld.mekong.dto.common;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private Boolean success;
    private T data;
    private String message;
    private ErrorDetails error;
    private LocalDateTime timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
            .success(true)
            .data(data)
            .timestamp(LocalDateTime.now())
            .build();
    }
    
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
            .success(true)
            .data(data)
            .message(message)
            .timestamp(LocalDateTime.now())
            .build();
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
            .success(false)
            .error(ErrorDetails.builder()
                .message(message)
                .build())
            .timestamp(LocalDateTime.now())
            .build();
    }
}

// PageResponse.java
@Data
@Builder
public class PageResponse<T> {
    private List<T> data;
    private PaginationInfo pagination;
    
    @Data
    @Builder
    public static class PaginationInfo {
        private Long total;
        private Integer page;
        private Integer limit;
        private Integer totalPages;
        private Boolean hasNext;
        private Boolean hasPrevious;
    }
}

// ErrorDetails.java
@Data
@Builder
public class ErrorDetails {
    private String code;
    private String message;
    private Map<String, List<String>> details;
}
```

### 5.4. Mapper Interfaces (MapStruct)

```java
// UserMapper.java
package com.happyworld.mekong.mapper;

import org.mapstruct.*;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.dto.response.UserResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    
    @Mapping(source = "profile.fullName", target = "fullName")
    @Mapping(source = "profile.avatarUrl", target = "avatarUrl")
    UserResponse toResponse(User user);
    
    List<UserResponse> toResponseList(List<User> users);
}

// CourseMapper.java
@Mapper(componentModel = "spring", 
        uses = {CenterMapper.class, InstructorMapper.class, CategoryMapper.class})
public interface CourseMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Course toEntity(CourseCreateRequest request);
    
    CourseResponse toResponse(Course course);
    
    List<CourseResponse> toResponseList(List<Course> courses);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget Course course, CourseCreateRequest request);
}
```

---

## 6. Service Layer Architecture

### 6.1. Service Layer Pattern

```java
// Base Service Interface
public interface BaseService<T, ID> {
    T create(T entity);
    T update(ID id, T entity);
    T findById(ID id);
    List<T> findAll();
    void delete(ID id);
}
```

### 6.2. Key Service Classes

#### 6.2.1. AuthService

```java
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    
    public AuthResponse register(RegisterRequest request) {
        // Validate email uniqueness
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        
        // Create user
        User user = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .isActive(true)
            .isVerified(false)
            .emailVerificationToken(UUID.randomUUID().toString())
            .build();
        
        // Assign default role
        Role role = roleRepository.findByName(request.getRole())
            .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        user.getRoles().add(role);
        
        // Create profile
        Profile profile = Profile.builder()
            .user(user)
            .fullName(request.getFullName())
            .phone(request.getPhone())
            .build();
        user.setProfile(profile);
        
        userRepository.save(user);
        
        // Send verification email
        emailService.sendVerificationEmail(user);
        
        // Generate tokens
        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);
        
        return AuthResponse.builder()
            .user(userMapper.toResponse(user))
            .token(token)
            .refreshToken(refreshToken)
            .expiresIn(jwtTokenProvider.getExpirationTime())
            .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
            if (user.getFailedLoginAttempts() >= 5) {
                user.setIsLocked(true);
            }
            userRepository.save(user);
            throw new UnauthorizedException("Invalid credentials");
        }
        
        if (user.getIsLocked()) {
            throw new UnauthorizedException("Account is locked");
        }
        
        if (!user.getIsActive()) {
            throw new UnauthorizedException("Account is inactive");
        }
        
        // 2FA check
        if (user.getTwoFactorEnabled() && request.getTwoFactorCode() == null) {
            return AuthResponse.builder()
                .requiresTwoFactor(true)
                .build();
        }
        
        // Update last login
        user.setLastLoginAt(LocalDateTime.now());
        user.setFailedLoginAttempts(0);
        userRepository.save(user);
        
        // Generate tokens
        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);
        
        return AuthResponse.builder()
            .user(userMapper.toResponse(user))
            .token(token)
            .refreshToken(refreshToken)
            .expiresIn(jwtTokenProvider.getExpirationTime())
            .build();
    }
}
```

#### 6.2.2. CourseService

```java
@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {
    private final CourseRepository courseRepository;
    private final CenterRepository centerRepository;
    private final InstructorRepository instructorRepository;
    private final CourseMapper courseMapper;
    private final SlugUtils slugUtils;
    
    public CourseResponse createCourse(CourseCreateRequest request) {
        // Validate center exists
        Center center = centerRepository.findById(request.getCenterId())
            .orElseThrow(() -> new ResourceNotFoundException("Center not found"));
        
        // Convert DTO to Entity
        Course course = courseMapper.toEntity(request);
        course.setCenter(center);
        course.setSlug(slugUtils.generateSlug(request.getTitle()));
        course.setStatus(CourseStatus.DRAFT);
        
        // Set instructor if provided
        if (request.getInstructorId() != null) {
            Instructor instructor = instructorRepository.findById(request.getInstructorId())
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));
            course.setInstructor(instructor);
        }
        
        Course savedCourse = courseRepository.save(course);
        return courseMapper.toResponse(savedCourse);
    }
    
    public PageResponse<CourseResponse> getCourses(CourseFilterRequest filter, Pageable pageable) {
        Specification<Course> spec = CourseSpecification.filterBy(filter);
        Page<Course> coursePage = courseRepository.findAll(spec, pageable);
        
        List<CourseResponse> courses = courseMapper.toResponseList(coursePage.getContent());
        
        return PageResponse.<CourseResponse>builder()
            .data(courses)
            .pagination(PaginationInfo.builder()
                .total(coursePage.getTotalElements())
                .page(pageable.getPageNumber() + 1)
                .limit(pageable.getPageSize())
                .totalPages(coursePage.getTotalPages())
                .hasNext(coursePage.hasNext())
                .hasPrevious(coursePage.hasPrevious())
                .build())
            .build();
    }
    
    public CourseResponse publishCourse(Long id) {
        Course course = courseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        // Validation before publish
        if (course.getLessons().isEmpty()) {
            throw new BadRequestException("Course must have at least one lesson");
        }
        
        course.setStatus(CourseStatus.PUBLISHED);
        course.setPublishedAt(LocalDateTime.now());
        
        Course published = courseRepository.save(course);
        return courseMapper.toResponse(published);
    }
}
```

#### 6.2.3. EnrollmentService

```java
@Service
@RequiredArgsConstructor
@Transactional
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final PaymentService paymentService;
    private final CertificateService certificateService;
    private final NotificationService notificationService;
    
    public EnrollmentResponse enrollCourse(Long userId, EnrollmentRequest request) {
        // Check if already enrolled
        if (enrollmentRepository.existsByUserIdAndCourseId(userId, request.getCourseId())) {
            throw new BadRequestException("Already enrolled in this course");
        }
        
        Course course = courseRepository.findById(request.getCourseId())
            .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        // Create enrollment
        Enrollment enrollment = Enrollment.builder()
            .user(User.builder().id(userId).build())
            .course(course)
            .status(EnrollmentStatus.PENDING)
            .totalLessons(course.getTotalLessons())
            .enrolledAt(LocalDateTime.now())
            .build();
        
        // If course is free, activate immediately
        if (course.getIsFree()) {
            enrollment.setStatus(EnrollmentStatus.ACTIVE);
            enrollment.setAmountPaid(BigDecimal.ZERO);
        } else {
            // Handle payment
            if (request.getPaymentId() != null) {
                Payment payment = paymentService.getPaymentById(request.getPaymentId());
                if (payment.getStatus() == PaymentStatus.COMPLETED) {
                    enrollment.setStatus(EnrollmentStatus.ACTIVE);
                    enrollment.setPayment(payment);
                    enrollment.setAmountPaid(payment.getAmount());
                }
            }
        }
        
        Enrollment saved = enrollmentRepository.save(enrollment);
        
        // Send notification
        notificationService.sendEnrollmentNotification(saved);
        
        // Update course stats
        course.setTotalStudents(course.getTotalStudents() + 1);
        courseRepository.save(course);
        
        return enrollmentMapper.toResponse(saved);
    }
    
    public void updateProgress(Long enrollmentId, Long lessonId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
            .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
        
        // Mark lesson as complete
        LessonProgress progress = lessonProgressRepository.findByEnrollmentIdAndLessonId(
            enrollmentId, lessonId)
            .orElse(LessonProgress.builder()
                .enrollment(enrollment)
                .lesson(Lesson.builder().id(lessonId).build())
                .build());
        
        if (!progress.getIsCompleted()) {
            progress.setIsCompleted(true);
            progress.setCompletedAt(LocalDateTime.now());
            lessonProgressRepository.save(progress);
            
            // Update enrollment progress
            enrollment.setCompletedLessons(enrollment.getCompletedLessons() + 1);
            BigDecimal percentage = BigDecimal.valueOf(enrollment.getCompletedLessons())
                .divide(BigDecimal.valueOf(enrollment.getTotalLessons()), 2, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
            enrollment.setProgressPercentage(percentage);
            
            // Check if completed
            if (enrollment.getCompletedLessons().equals(enrollment.getTotalLessons())) {
                enrollment.setStatus(EnrollmentStatus.COMPLETED);
                enrollment.setCompletedAt(LocalDateTime.now());
                
                // Issue certificate
                if (enrollment.getCourse().getHasCertificate()) {
                    certificateService.issueCertificate(enrollment);
                }
            }
            
            enrollmentRepository.save(enrollment);
        }
    }
}
```

### 6.3. Business Logic Patterns

#### 6.3.1. Specification Pattern (Dynamic Queries)

```java
public class CourseSpecification {
    public static Specification<Course> filterBy(CourseFilterRequest filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Filter by center
            if (filter.getCenterId() != null) {
                predicates.add(cb.equal(root.get("center").get("id"), filter.getCenterId()));
            }
            
            // Filter by category
            if (filter.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"), filter.getCategoryId()));
            }
            
            // Filter by price range
            if (filter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
            }
            if (filter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
            }
            
            // Filter by level
            if (filter.getLevel() != null) {
                predicates.add(cb.equal(root.get("level"), filter.getLevel()));
            }
            
            // Only published courses
            predicates.add(cb.equal(root.get("status"), CourseStatus.PUBLISHED));
            predicates.add(cb.isNull(root.get("deletedAt")));
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
```

#### 6.3.2. Event-Driven Pattern

```java
// Event Publishing
@Service
public class EnrollmentEventPublisher {
    private final ApplicationEventPublisher eventPublisher;
    
    public void publishEnrollmentCreated(Enrollment enrollment) {
        EnrollmentCreatedEvent event = new EnrollmentCreatedEvent(enrollment);
        eventPublisher.publishEvent(event);
    }
}

// Event Listener
@Component
public class EnrollmentEventListener {
    
    @EventListener
    @Async
    public void handleEnrollmentCreated(EnrollmentCreatedEvent event) {
        Enrollment enrollment = event.getEnrollment();
        
        // Send welcome email
        emailService.sendWelcomeEmail(enrollment.getUser(), enrollment.getCourse());
        
        // Log analytics
        analyticsService.trackEnrollment(enrollment);
        
        // Update instructor stats
        instructorService.updateStats(enrollment.getCourse().getInstructor());
    }
    
    @EventListener
    @Async
    public void handleCourseCompleted(CourseCompletedEvent event) {
        // Issue certificate
        certificateService.issueCertificate(event.getEnrollment());
        
        // Send congratulations email
        emailService.sendCongratulationsEmail(event.getEnrollment());
    }
}
```

---

## 7. Security & Authentication

### 7.1. Spring Security Configuration

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/courses/**").permitAll()
                .requestMatchers("/api/v1/posts/**").permitAll()
                .requestMatchers("/api/v1/jobs/**").permitAll()
                .requestMatchers("/api/v1/health/**").permitAll()
                
                // Admin endpoints
                .requestMatchers("/api/v1/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                
                // Protected endpoints
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                .accessDeniedHandler(new JwtAccessDeniedHandler())
            );
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

### 7.2. JWT Token Provider

```java
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private Long jwtExpiration;
    
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoles().stream()
            .map(Role::getName)
            .collect(Collectors.toList()));
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.getEmail())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    public String getUserEmailFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody();
        return claims.getSubject();
    }
}
```

### 7.3. Custom UserDetailsService

```java
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .authorities(user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList()))
            .accountExpired(false)
            .accountLocked(user.getIsLocked())
            .credentialsExpired(false)
            .disabled(!user.getIsActive())
            .build();
    }
}
```

### 7.4. Method-Level Security

```java
@Service
public class CourseService {
    
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER')")
    public CourseResponse createCourse(CourseCreateRequest request) {
        // Only ADMIN and CENTER_MANAGER can create courses
    }
    
    @PreAuthorize("hasRole('ADMIN') or @courseSecurityService.isInstructorOfCourse(#id, authentication.principal.userId)")
    public CourseResponse updateCourse(Long id, CourseUpdateRequest request) {
        // Only ADMIN or course instructor can update
    }
    
    @PreAuthorize("@enrollmentSecurityService.canAccessEnrollment(#id, authentication.principal.userId)")
    public EnrollmentResponse getEnrollment(Long id) {
        // Only owner or admin can view enrollment
    }
}

@Component
public class CourseSecurityService {
    private final CourseRepository courseRepository;
    
    public boolean isInstructorOfCourse(Long courseId, Long userId) {
        return courseRepository.findById(courseId)
            .map(course -> course.getInstructor() != null && 
                          course.getInstructor().getUser().getId().equals(userId))
            .orElse(false);
    }
}
```

---

## 8. File Upload & Storage

### 8.1. AWS S3 Configuration

```java
@Configuration
public class S3Config {
    
    @Value("${aws.s3.access-key}")
    private String accessKey;
    
    @Value("${aws.s3.secret-key}")
    private String secretKey;
    
    @Value("${aws.s3.region}")
    private String region;
    
    @Bean
    public AmazonS3 amazonS3() {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        
        return AmazonS3ClientBuilder.standard()
            .withRegion(region)
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .build();
    }
}
```

### 8.2. Storage Service

```java
@Service
@RequiredArgsConstructor
public class StorageService {
    
    private final AmazonS3 amazonS3;
    
    @Value("${aws.s3.bucket}")
    private String bucketName;
    
    @Value("${aws.cloudfront.domain}")
    private String cloudFrontDomain;
    
    public String uploadFile(MultipartFile file, String folder) {
        try {
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            String filename = UUID.randomUUID().toString() + "." + extension;
            String key = folder + "/" + filename;
            
            // Prepare metadata
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            
            // Upload to S3
            amazonS3.putObject(new PutObjectRequest(
                bucketName,
                key,
                file.getInputStream(),
                metadata
            ).withCannedAcl(CannedAccessControlList.PublicRead));
            
            // Return CloudFront URL
            return cloudFrontDomain + "/" + key;
            
        } catch (IOException e) {
            throw new StorageException("Failed to upload file", e);
        }
    }
    
    public void deleteFile(String fileUrl) {
        try {
            String key = fileUrl.replace(cloudFrontDomain + "/", "");
            amazonS3.deleteObject(bucketName, key);
        } catch (AmazonServiceException e) {
            throw new StorageException("Failed to delete file", e);
        }
    }
    
    public String uploadImage(MultipartFile file, String folder, int maxWidth) {
        try {
            // Resize image
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            BufferedImage resizedImage = Thumbnails.of(originalImage)
                .width(maxWidth)
                .asBufferedImage();
            
            // Convert to bytes
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(resizedImage, "jpg", baos);
            byte[] bytes = baos.toByteArray();
            
            // Upload
            String filename = UUID.randomUUID().toString() + ".jpg";
            String key = folder + "/" + filename;
            
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");
            metadata.setContentLength(bytes.length);
            
            amazonS3.putObject(new PutObjectRequest(
                bucketName,
                key,
                new ByteArrayInputStream(bytes),
                metadata
            ).withCannedAcl(CannedAccessControlList.PublicRead));
            
            return cloudFrontDomain + "/" + key;
            
        } catch (IOException e) {
            throw new StorageException("Failed to upload image", e);
        }
    }
}
```

---

## 9. Payment Integration

### 9.1. VNPay Integration

```java
@Service
@RequiredArgsConstructor
public class VNPayService implements PaymentGatewayService {
    
    @Value("${vnpay.tmn-code}")
    private String tmnCode;
    
    @Value("${vnpay.hash-secret}")
    private String hashSecret;
    
    @Value("${vnpay.url}")
    private String vnpayUrl;
    
    @Value("${vnpay.return-url}")
    private String returnUrl;
    
    public String createPaymentUrl(Payment payment) {
        Map<String, String> vnpParams = new TreeMap<>();
        
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", tmnCode);
        vnpParams.put("vnp_Amount", String.valueOf(payment.getAmount().longValue() * 100));
        vnpParams.put("vnp_CurrCode", "VND");
        vnpParams.put("vnp_TxnRef", payment.getPaymentCode());
        vnpParams.put("vnp_OrderInfo", "Payment for " + payment.getPaymentType());
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_IpAddr", "127.0.0.1");
        vnpParams.put("vnp_CreateDate", new SimpleDateFormat("yyyyMMddHHmmss")
            .format(new Date()));
        
        // Build query string
        StringBuilder query = new StringBuilder();
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            query.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            query.append("=");
            query.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
            query.append("&");
        }
        query.deleteCharAt(query.length() - 1);
        
        // Generate secure hash
        String secureHash = VNPayUtils.hmacSHA512(hashSecret, query.toString());
        
        return vnpayUrl + "?" + query + "&vnp_SecureHash=" + secureHash;
    }
    
    public PaymentCallbackResult handleCallback(Map<String, String> params) {
        String secureHash = params.get("vnp_SecureHash");
        params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");
        
        // Verify signature
        String calculatedHash = VNPayUtils.hmacSHA512(hashSecret, 
            buildQueryString(params));
        
        if (!secureHash.equals(calculatedHash)) {
            throw new PaymentException("Invalid signature");
        }
        
        String responseCode = params.get("vnp_ResponseCode");
        String txnRef = params.get("vnp_TxnRef");
        String transactionId = params.get("vnp_TransactionNo");
        
        return PaymentCallbackResult.builder()
            .success("00".equals(responseCode))
            .paymentCode(txnRef)
            .gatewayTransactionId(transactionId)
            .responseCode(responseCode)
            .build();
    }
}
```

### 9.2. Momo Integration

```java
@Service
public class MomoService implements PaymentGatewayService {
    
    @Value("${momo.partner-code}")
    private String partnerCode;
    
    @Value("${momo.access-key}")
    private String accessKey;
    
    @Value("${momo.secret-key}")
    private String secretKey;
    
    @Value("${momo.endpoint}")
    private String momoEndpoint;
    
    public String createPaymentUrl(Payment payment) {
        String orderId = payment.getPaymentCode();
        String requestId = UUID.randomUUID().toString();
        long amount = payment.getAmount().longValue();
        
        String rawSignature = String.format(
            "accessKey=%s&amount=%d&extraData=&ipnUrl=%s&orderId=%s&orderInfo=%s&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=captureWallet",
            accessKey, amount, ipnUrl, orderId, "Payment", partnerCode, returnUrl, requestId
        );
        
        String signature = MomoUtils.hmacSHA256(secretKey, rawSignature);
        
        JSONObject requestBody = new JSONObject();
        requestBody.put("partnerCode", partnerCode);
        requestBody.put("requestId", requestId);
        requestBody.put("amount", amount);
        requestBody.put("orderId", orderId);
        requestBody.put("orderInfo", "Payment for " + payment.getPaymentType());
        requestBody.put("redirectUrl", returnUrl);
        requestBody.put("ipnUrl", ipnUrl);
        requestBody.put("requestType", "captureWallet");
        requestBody.put("extraData", "");
        requestBody.put("signature", signature);
        
        // Call Momo API
        HttpResponse<String> response = Unirest.post(momoEndpoint)
            .header("Content-Type", "application/json")
            .body(requestBody.toString())
            .asString();
        
        JSONObject jsonResponse = new JSONObject(response.getBody());
        return jsonResponse.getString("payUrl");
    }
}
```

---

## 10. Email & Notification System

### 10.1. Email Service

```java
@Service
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    
    @Value("${app.mail.from}")
    private String fromEmail;
    
    @Async
    public void sendVerificationEmail(User user) {
        Context context = new Context();
        context.setVariable("name", user.getProfile().getFullName());
        context.setVariable("verificationLink", 
            "https://happyworldmekong.com/verify?token=" + user.getEmailVerificationToken());
        
        String html = templateEngine.process("email/verification", context);
        
        sendHtmlEmail(
            user.getEmail(),
            "Xác thực tài khoản Happy World Mekong",
            html
        );
    }
    
    @Async
    public void sendWelcomeEmail(User user, Course course) {
        Context context = new Context();
        context.setVariable("userName", user.getProfile().getFullName());
        context.setVariable("courseName", course.getTitle());
        context.setVariable("courseUrl", "https://happyworldmekong.com/courses/" + course.getSlug());
        
        String html = templateEngine.process("email/welcome-enrollment", context);
        
        sendHtmlEmail(
            user.getEmail(),
            "Chào mừng bạn đến với " + course.getTitle(),
            html
        );
    }
    
    private void sendHtmlEmail(String to, String subject, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            
            mailSender.send(message);
            
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
        }
    }
}
```

### 10.2. Notification Service

```java
@Service
@RequiredArgsConstructor
public class NotificationService {
    
    private final NotificationRepository notificationRepository;
    private final FirebaseMessagingService fcmService;
    private final WebSocketService webSocketService;
    
    public void sendNotification(Long userId, String type, String title, 
                                String message, String actionUrl) {
        // Save to database
        Notification notification = Notification.builder()
            .user(User.builder().id(userId).build())
            .type(type)
            .title(title)
            .message(message)
            .actionUrl(actionUrl)
            .isRead(false)
            .sentVia("in_app")
            .build();
        
        notificationRepository.save(notification);
        
        // Send real-time via WebSocket
        webSocketService.sendToUser(userId, notification);
        
        // Send push notification via FCM
        fcmService.sendPushNotification(userId, title, message, actionUrl);
    }
    
    public void sendEnrollmentNotification(Enrollment enrollment) {
        sendNotification(
            enrollment.getUser().getId(),
            "enrollment",
            "Đăng ký thành công!",
            "Bạn đã đăng ký khóa học: " + enrollment.getCourse().getTitle(),
            "/my-courses/" + enrollment.getId()
        );
    }
}
```

---

## 11. Admin Dashboard Features

### 11.1. Dashboard Statistics Service

```java
@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PaymentRepository paymentRepository;
    
    public DashboardStatsResponse getOverviewStats() {
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        
        return DashboardStatsResponse.builder()
            .totalUsers(userRepository.count())
            .newUsersThisMonth(userRepository.countByCreatedAtAfter(startOfMonth))
            .totalCourses(courseRepository.countByStatus(CourseStatus.PUBLISHED))
            .totalEnrollments(enrollmentRepository.count())
            .activeEnrollments(enrollmentRepository.countByStatus(EnrollmentStatus.ACTIVE))
            .totalRevenue(paymentRepository.sumAmountByStatus(PaymentStatus.COMPLETED))
            .revenueThisMonth(paymentRepository.sumAmountByStatusAndCreatedAtAfter(
                PaymentStatus.COMPLETED, startOfMonth))
            .topCourses(getTopCourses(10))
            .recentEnrollments(getRecentEnrollments(10))
            .build();
    }
    
    public List<CourseStatsDTO> getTopCourses(int limit) {
        return courseRepository.findTopCoursesByEnrollments(PageRequest.of(0, limit))
            .stream()
            .map(course -> CourseStatsDTO.builder()
                .courseId(course.getId())
                .title(course.getTitle())
                .totalStudents(course.getTotalStudents())
                .averageRating(course.getAverageRating())
                .revenue(calculateCourseRevenue(course.getId()))
                .build())
            .collect(Collectors.toList());
    }
    
    public RevenueReportDTO getRevenueReport(LocalDate startDate, LocalDate endDate) {
        List<Payment> payments = paymentRepository.findByStatusAndPaidAtBetween(
            PaymentStatus.COMPLETED,
            startDate.atStartOfDay(),
            endDate.atTime(23, 59, 59)
        );
        
        Map<LocalDate, BigDecimal> dailyRevenue = payments.stream()
            .collect(Collectors.groupingBy(
                p -> p.getPaidAt().toLocalDate(),
                Collectors.reducing(BigDecimal.ZERO, Payment::getAmount, BigDecimal::add)
            ));
        
        return RevenueReportDTO.builder()
            .totalRevenue(payments.stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add))
            .totalTransactions(payments.size())
            .dailyRevenue(dailyRevenue)
            .build();
    }
}
```

---

## 12. Deployment & DevOps

### 12.1. Docker Configuration

```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim as build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline
COPY src src
RUN ./mvnw package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: happyworld_mekong
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/happyworld_mekong
      SPRING_REDIS_HOST: redis
    depends_on:
      - mysql
      - redis

volumes:
  mysql_data:
```

### 12.2. CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
          
      - name: Build with Maven
        run: mvn clean package -DskipTests
        
      - name: Run tests
        run: mvn test
        
      - name: Build Docker image
        run: docker build -t happyworld-backend:latest .
        
      - name: Push to Docker Hub
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push happyworld-backend:latest
          
      - name: Deploy to Production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /app
            docker-compose pull
            docker-compose up -d
```

### 12.3. Application Properties

```yaml
# application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://${DB_HOST}:3306/${DB_NAME}?useSSL=true
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: false
        show_sql: false
        
  redis:
    host: ${REDIS_HOST}
    port: 6379
    
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
    
jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000
  
aws:
  s3:
    access-key: ${AWS_ACCESS_KEY}
    secret-key: ${AWS_SECRET_KEY}
    bucket: ${AWS_S3_BUCKET}
    region: ap-southeast-1
    
vnpay:
  tmn-code: ${VNPAY_TMN_CODE}
  hash-secret: ${VNPAY_HASH_SECRET}
  url: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
  
logging:
  level:
    root: INFO
    com.happyworld.mekong: INFO
  file:
    name: /var/log/happyworld-backend.log
```

---

## 📊 TÓM TẮT & KẾT LUẬN

### Thống kê hệ thống Backend

| Component | Số lượng | Chi tiết |
|-----------|----------|----------|
| **Database Tables** | 38+ | Users, Courses, Payments, Jobs, etc. |
| **API Endpoints** | 150+ | Authentication, CRUD, Admin APIs |
| **Entity Classes** | 30+ | JPA Entities với relationships |
| **DTOs** | 50+ | Request/Response DTOs |
| **Services** | 25+ | Business logic services |
| **Repositories** | 30+ | JPA Repositories |
| **Security Roles** | 8 | Phân quyền chi tiết |
| **Payment Gateways** | 3 | VNPay, Momo, Banking |
| **File Storage** | 2 | AWS S3, MinIO |

### Tech Stack Summary

**Backend Core**:
- Spring Boot 3.2.x + Java 17
- Spring Data JPA + Hibernate
- Spring Security + JWT
- MySQL 8.0 / PostgreSQL 16

**Infrastructure**:
- Redis (Cache)
- RabbitMQ (Message Queue)
- AWS S3 (Storage)
- Docker + Kubernetes

**Integration**:
- VNPay + Momo (Payment)
- Firebase (Push Notification)
- AWS SES (Email)
- Elasticsearch (Search)

### Timeline phát triển dự kiến

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Phase 1: Core Setup** | 2 weeks | Database, Authentication, User Management |
| **Phase 2: Course Module** | 3 weeks | Courses, Enrollment, Learning |
| **Phase 3: Payment** | 2 weeks | Payment integration, Transactions |
| **Phase 4: Job Module** | 2 weeks | Jobs, Applications, Resumes |
| **Phase 5: CMS** | 1 week | Posts, Media, Gallery |
| **Phase 6: Integration** | 2 weeks | Email, SMS, Notifications, Storage |
| **Phase 7: Admin** | 2 weeks | Admin Dashboard, Analytics, Reports |
| **Phase 8: Testing & Deploy** | 2 weeks | Testing, CI/CD, Production |
| **TOTAL** | **16 weeks** | **~4 months** |

---

**Ngày tạo**: 15/01/2025  
**Version**: 1.0  
**Tác giả**: AI Assistant  
**Status**: ✅ **HOÀN THÀNH**

🎉 **File phân tích backend đầy đủ cho dự án Happy World Mekong!**

