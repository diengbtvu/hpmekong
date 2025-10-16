# ⚡ QUICK START GUIDE - HAPPY WORLD MEKONG BACKEND

## 🚀 Chạy Backend trong 5 phút

### Yêu cầu
- ✅ Java 17+
- ✅ Maven 3.9+
- ✅ MySQL 8.0+

### Bước 1: Setup Database (2 phút)

```bash
# Mở MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE happyworld_mekong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit
EXIT;
```

### Bước 2: Cấu hình (1 phút)

Mở file `src/main/resources/application-dev.yml` và cập nhật:

```yaml
spring:
  datasource:
    username: root        # ← Thay bằng MySQL username của bạn
    password: your_pass   # ← Thay bằng MySQL password của bạn

jwt:
  secret: YourSecretKey123  # ← Có thể giữ nguyên hoặc đổi
```

### Bước 3: Chạy (2 phút)

```bash
# Chạy trực tiếp
mvn spring-boot:run

# Hoặc build rồi chạy
mvn clean package -DskipTests
java -jar target/mekong-backend-1.0.0.jar
```

### Bước 4: Verify

Mở browser hoặc Postman:
```
http://localhost:8080/api/v1/health
```

Kết quả mong đợi:
```json
{
  "success": true,
  "data": {
    "status": "UP",
    "application": "Happy World Mekong",
    "version": "1.0.0"
  }
}
```

---

## ✅ DONE! Backend đã chạy thành công

### API có thể test ngay:

**Public APIs (không cần login):**
- `GET /api/v1/courses` - Danh sách khóa học
- `GET /api/v1/posts` - Danh sách bài viết
- `GET /api/v1/jobs` - Danh sách việc làm
- `POST /api/v1/auth/register` - Đăng ký
- `POST /api/v1/auth/login` - Đăng nhập

### Test Register:
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "fullName": "Nguyen Van A",
    "phone": "0901234567"
  }'
```

---

## 🎯 Các thư mục quan trọng

- `uploads/` - File được upload sẽ lưu ở đây
- `logs/` - Application logs (tự động tạo)
- `target/` - Build output

---

## 🔥 Tips

### Chạy với profile cụ thể:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Xem logs real-time:
```bash
tail -f logs/application.log
```

### Hot reload (development):
Trong `pom.xml` đã có `spring-boot-devtools` - tự động reload khi code thay đổi.

---

## 🆘 Troubleshooting

### Lỗi: "Access denied for user"
→ Kiểm tra lại username/password trong `application-dev.yml`

### Lỗi: "Communications link failure"
→ MySQL chưa chạy: `sudo systemctl start mysql`

### Lỗi: "Port 8080 already in use"
→ Đổi port trong `application.yml`: `server.port: 8081`

### Lỗi: "Flyway migration failed"
→ Drop database và tạo lại:
```sql
DROP DATABASE happyworld_mekong;
CREATE DATABASE happyworld_mekong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

**Thời gian setup**: ~5 phút  
**Status**: ✅ Ready to run

