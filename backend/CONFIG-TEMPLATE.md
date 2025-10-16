# ⚙️ CONFIGURATION TEMPLATE

## Environment Variables

Copy và paste vào file `application-dev.yml` hoặc set as environment variables:

### 🗄️ Database Configuration
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/happyworld_mekong
    username: root                    # ← THAY ĐỔI
    password: your_mysql_password     # ← THAY ĐỔI
```

### 🔐 JWT Configuration
```yaml
jwt:
  secret: YourVeryLongSecretKeyHereMinimum256BitsForHS512Algorithm2025  # ← ĐỔI MỚI
  expiration: 86400000              # 24 hours
  refresh-expiration: 604800000     # 7 days
```

### 📧 Email Configuration (Gmail)
```yaml
spring:
  mail:
    username: noreply@yourdomain.com    # ← THAY ĐỔI
    password: your_gmail_app_password   # ← THAY ĐỔI (App Password, not regular password)
```

**Cách lấy Gmail App Password:**
1. Vào https://myaccount.google.com/security
2. Bật "2-Step Verification"
3. Tạo "App Password"
4. Copy password 16 ký tự

### 💳 PayOS Configuration
```yaml
payos:
  client-id: your_client_id         # ← THAY ĐỔI
  api-key: your_api_key             # ← THAY ĐỔI
  checksum-key: your_checksum_key   # ← THAY ĐỔI
  environment: sandbox              # sandbox hoặc production
```

**Lấy PayOS credentials:**
1. Đăng ký tại: https://payos.vn
2. Vào Dashboard → API Keys
3. Copy: Client ID, API Key, Checksum Key

### 📂 File Upload
```yaml
file:
  upload:
    path: ./uploads                 # Dev: thư mục hiện tại
    # path: /var/www/happyworld-mekong/uploads  # Prod: absolute path
    max-size: 52428800              # 50MB
```

### 🌐 Application URLs
```yaml
app:
  base-url: http://localhost:8080           # ← Backend URL
  frontend-url: http://localhost:5173       # ← Frontend URL
```

---

## 🔧 Production Configuration

Cho production, tạo file `application-prod.yml` hoặc set environment variables:

```bash
# Database
export DB_HOST=localhost
export DB_NAME=happyworld_mekong
export DB_USERNAME=happyworld
export DB_PASSWORD=strong_password_here

# JWT
export JWT_SECRET=very_long_secret_key_256_bits_minimum

# PayOS
export PAYOS_CLIENT_ID=your_prod_client_id
export PAYOS_API_KEY=your_prod_api_key
export PAYOS_CHECKSUM_KEY=your_prod_checksum_key

# Email
export MAIL_USERNAME=noreply@yourdomain.com
export MAIL_PASSWORD=your_email_password

# URLs
export APP_BASE_URL=https://api.yourdomain.com
export APP_FRONTEND_URL=https://yourdomain.com

# File
export FILE_UPLOAD_PATH=/var/www/happyworld-mekong/uploads
```

---

## ✅ Checklist Configuration

- [ ] Database credentials configured
- [ ] JWT secret changed (min 256 bits)
- [ ] Gmail app password configured
- [ ] PayOS credentials configured
- [ ] File upload path created
- [ ] URLs configured correctly
- [ ] Redis configured (if using)

---

## 🆘 Common Issues

**Issue**: Can't connect to MySQL  
**Solution**: Check username/password, ensure MySQL is running

**Issue**: JWT token invalid  
**Solution**: Ensure JWT secret is at least 256 bits

**Issue**: File upload failed  
**Solution**: Check upload path exists and has write permission

**Issue**: Email not sending  
**Solution**: Use Gmail App Password, not regular password

**Issue**: PayOS payment failed  
**Solution**: Check credentials, ensure sandbox/production mode correct

---

**Created**: January 2025  
**For**: Development & Production Setup

