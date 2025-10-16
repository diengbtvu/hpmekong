# 📚 API DOCUMENTATION - HAPPY WORLD MEKONG

Base URL: `http://localhost:8080/api/v1`

## 🔐 Authentication

Hầu hết endpoints cần JWT token trong header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 1️⃣ AUTHENTICATION APIs

### POST `/auth/register`
Đăng ký tài khoản mới

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "Test123!",
  "fullName": "Nguyen Van A",
  "phone": "0901234567",
  "role": "STUDENT"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "student@example.com",
      "fullName": "Nguyen Van A",
      "roles": ["STUDENT"]
    },
    "token": "eyJhbGci...",
    "refreshToken": "eyJhbGci...",
    "expiresIn": 86400000
  }
}
```

### POST `/auth/login`
Đăng nhập

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "Test123!"
}
```

---

## 2️⃣ COURSE APIs

### GET `/courses`
Danh sách khóa học (Public)

**Query Params:**
- `page` (default: 0)
- `size` (default: 20)
- `sortBy` (default: createdAt)
- `direction` (asc/desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Khóa học Marketing Online",
        "slug": "khoa-hoc-marketing-online",
        "price": 2100000,
        "originalPrice": 3000000,
        "discountPercentage": 30,
        "thumbnailUrl": "http://localhost:8080/uploads/courses/thumbnails/abc.jpg",
        "totalStudents": 150,
        "averageRating": 4.8,
        "center": {
          "name": "Mekong Skills Pro",
          "slug": "mekong-skills-pro"
        }
      }
    ],
    "totalElements": 50,
    "totalPages": 3
  }
}
```

### GET `/courses/{slug}`
Chi tiết khóa học

### POST `/courses` 🔒 Admin
Tạo khóa học mới

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Khóa học Marketing Online",
  "subtitle": "Học marketing từ A-Z",
  "description": "Khóa học marketing toàn diện...",
  "centerId": 1,
  "categoryId": 2,
  "price": 2100000,
  "level": "beginner",
  "deliveryMode": "online",
  "durationHours": 40
}
```

---

## 3️⃣ ENROLLMENT APIs

### POST `/enrollments` 🔒
Đăng ký khóa học

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "courseId": 1,
  "couponCode": "NEWYEAR2025"
}
```

### GET `/enrollments` 🔒
Khóa học của tôi

**Query Params:**
- `page` (default: 0)
- `size` (default: 20)

### PUT `/enrollments/{id}/progress` 🔒
Cập nhật tiến độ học

**Query Params:**
- `completedLessons`: số bài đã hoàn thành

---

## 4️⃣ PAYMENT APIs (PayOS)

### POST `/payments/create` 🔒
Tạo thanh toán

**Request Body:**
```json
{
  "amount": 2100000,
  "paymentType": "course_enrollment",
  "referenceId": 1,
  "description": "Thanh toán khóa học Marketing"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "paymentCode": "MK-PAY-20250116-ABC123",
    "amount": 2100000,
    "checkoutUrl": "https://pay.payos.vn/...",
    "qrCode": "data:image/png;base64,...",
    "expiresAt": "2025-01-16T10:45:00"
  }
}
```

### GET `/payments/{paymentCode}` 🔒
Kiểm tra trạng thái thanh toán

---

## 5️⃣ FILE UPLOAD APIs

### POST `/files/upload/image` 🔒
Upload hình ảnh

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: file to upload
- `folder`: target folder (default: "images")
- `maxWidth`: max width in pixels (default: 1920)

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:8080/uploads/images/uuid.jpg",
    "filename": "original-name.jpg"
  }
}
```

### POST `/files/upload/avatar` 🔒
Upload avatar (auto resize to 500px)

### POST `/files/upload/course-thumbnail` 🔒 Admin
Upload thumbnail khóa học (auto resize to 1280px)

---

## 6️⃣ POST/NEWS APIs

### GET `/posts`
Danh sách bài viết (Public)

### GET `/posts/{slug}`
Chi tiết bài viết (Public)

### POST `/posts` 🔒 Admin
Tạo bài viết mới

**Request Body:**
```json
{
  "title": "Tin tức mới nhất",
  "excerpt": "Tóm tắt bài viết",
  "content": "<p>Nội dung HTML...</p>",
  "featuredImageUrl": "http://...",
  "categoryId": 1,
  "isFeatured": false
}
```

---

## 7️⃣ JOB APIs

### GET `/jobs`
Danh sách việc làm (Public)

### GET `/jobs/{slug}`
Chi tiết công việc (Public)

---

## 8️⃣ ADMIN APIs

### GET `/admin/dashboard/stats` 🔒 Admin
Thống kê tổng quan

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "newUsersThisMonth": 85,
    "totalCourses": 45,
    "publishedCourses": 38,
    "totalEnrollments": 3420,
    "activeEnrollments": 2150,
    "totalRevenue": 125000000,
    "revenueThisMonth": 18500000
  }
}
```

---

## 9️⃣ SYSTEM APIs

### GET `/health`
Health check (Public)

### GET `/info`
Application info (Public)

---

## 📝 Error Response Format

Tất cả errors đều trả về format chuẩn:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": {
      "email": ["Email đã tồn tại"],
      "password": ["Mật khẩu phải có ít nhất 8 ký tự"]
    }
  },
  "timestamp": "2025-01-16T10:30:00"
}
```

### Error Codes:
- `NOT_FOUND` - 404
- `BAD_REQUEST` - 400
- `UNAUTHORIZED` - 401
- `FORBIDDEN` - 403
- `VALIDATION_ERROR` - 400
- `INTERNAL_SERVER_ERROR` - 500

---

## 🔑 Authentication Flow

### 1. Register
```bash
POST /api/v1/auth/register
→ Returns: user + JWT token
```

### 2. Use Token
```bash
GET /api/v1/enrollments
Headers: Authorization: Bearer <token>
```

### 3. Token expires after 24h
```bash
# Login lại hoặc dùng refresh token
```

---

## 📦 Response Pagination

Các endpoints trả về list đều có pagination:

```json
{
  "success": true,
  "data": {
    "content": [...],
    "totalElements": 150,
    "totalPages": 8,
    "size": 20,
    "number": 0,
    "first": true,
    "last": false
  }
}
```

---

## 🧪 Test với Postman

### Import Collection:

**Base URL:** `http://localhost:8080/api/v1`

**Environment Variables:**
- `base_url`: http://localhost:8080/api/v1
- `token`: (sẽ tự động set sau khi login)

### Test Flow:
1. Register user
2. Login → Save token
3. Get courses (public)
4. Enroll course (with token)
5. Upload avatar (with token)
6. Check enrollment progress

---

**Created**: January 2025  
**API Version**: 1.0  
**Total Endpoints**: 31+

