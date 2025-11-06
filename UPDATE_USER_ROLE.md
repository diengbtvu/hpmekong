# Hướng dẫn cập nhật Role cho User

## Vấn đề đã Fix
- ✅ Admin users bị 403 khi truy cập `/api/v1/admin/**` endpoints
- ✅ Đã fix duplicate `ROLE_` prefix trong authentication

## Cách cập nhật Role cho User qua Database

### 1. Kết nối MySQL
```bash
mysql -h 127.0.0.1 -u hpmekong -p'k/fFYISAMEKPLbJqbskccKWyCTjv/jAFYLy1/MQSckQ=' hpmekong
```

### 2. Xem danh sách Users
```sql
SELECT id, email FROM users;
```

### 3. Xem danh sách Roles
```sql
SELECT id, name FROM roles;
```

Roles available:
- `ROLE_SUPER_ADMIN` (id: 1) - Quyền cao nhất
- `ROLE_ADMIN` (id: 2) - Quản trị viên  
- `ROLE_USER` (id: 3) - Người dùng
- `ROLE_STUDENT` (id: 4) - Học viên (default)
- `ROLE_INSTRUCTOR` (id: 5) - Giảng viên

### 4. Cập nhật Role cho User

#### Cách 1: Xóa role cũ và thêm role mới
```sql
-- Ví dụ: Cập nhật user có id=1 thành SUPER_ADMIN
DELETE FROM user_roles WHERE user_id = 1;

INSERT INTO user_roles (user_id, role_id)
SELECT 1, id FROM roles WHERE name = 'ROLE_SUPER_ADMIN';
```

#### Cách 2: Thêm thêm role (user có nhiều roles)
```sql
-- Thêm role ADMIN cho user id=1 (giữ nguyên roles cũ)
INSERT INTO user_roles (user_id, role_id)
SELECT 1, id FROM roles WHERE name = 'ROLE_ADMIN';
```

### 5. Kiểm tra kết quả
```sql
SELECT u.id, u.email, r.name as role_name 
FROM users u 
JOIN user_roles ur ON u.id = ur.user_id 
JOIN roles r ON ur.role_id = r.id 
WHERE u.email = 'your-email@hwm.edu.vn';
```

### 6. Test sau khi cập nhật
User cần **login lại** để nhận token mới với role mới:

```bash
# Login để lấy token mới
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@hwm.edu.vn", "password": "YourPassword"}'

# Test admin endpoint
curl -X GET "http://localhost:8080/api/v1/admin/contacts" \
  -H "Authorization: Bearer YOUR_NEW_TOKEN"
```

## Script tự động cập nhật

### Tạo Super Admin cho user hiện tại:
```bash
mysql -h 127.0.0.1 -u hpmekong -p'k/fFYISAMEKPLbJqbskccKWyCTjv/jAFYLy1/MQSckQ=' hpmekong << 'EOF'
-- Thay YOUR_EMAIL bằng email của bạn
SET @email = 'YOUR_EMAIL@hwm.edu.vn';

DELETE FROM user_roles WHERE user_id = (SELECT id FROM users WHERE email = @email);

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id 
FROM users u, roles r 
WHERE u.email = @email AND r.name = 'ROLE_SUPER_ADMIN';

-- Verify
SELECT u.id, u.email, r.name as role_name 
FROM users u 
JOIN user_roles ur ON u.id = ur.user_id 
JOIN roles r ON ur.role_id = r.id 
WHERE u.email = @email;
EOF
```

## Lưu ý quan trọng
1. **User phải login lại** sau khi role được cập nhật để nhận token mới
2. Token cũ vẫn có role cũ cho đến khi hết hạn
3. Mỗi user có thể có nhiều roles
4. Role names trong DB phải có prefix `ROLE_` (ví dụ: `ROLE_ADMIN`, không phải `ADMIN`)

## Endpoints yêu cầu Admin role
- `/api/v1/admin/contacts` - Quản lý liên hệ
- `/api/v1/admin/posts` - Quản lý bài viết
- `/api/v1/admin/enrollments` - Quản lý đăng ký khóa học
- `/api/v1/admin/payments` - Quản lý thanh toán
- `/api/v1/admin/courses` - Quản lý khóa học
- `/api/v1/admin/centers` - Quản lý trung tâm
- `/api/v1/admin/leaders` - Quản lý lãnh đạo
- `/api/v1/admin/partners` - Quản lý đối tác
- `/api/v1/admin/achievements` - Quản lý thành tựu
- `/api/v1/admin/settings` - Cài đặt hệ thống (chỉ SUPER_ADMIN)

## Đã test thành công
✅ `testuser@hwm.edu.vn` với `ROLE_SUPER_ADMIN` - Truy cập admin dashboard OK
✅ All admin endpoints trả về 200 thay vì 403
✅ Authentication và authorization hoạt động hoàn hảo
