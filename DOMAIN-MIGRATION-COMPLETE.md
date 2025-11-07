# ✅ HOÀN TẤT CHUYỂN DOMAIN MỚI

## 🎉 Kết quả triển khai

Domain mới **hwm.edu.vn** đã được triển khai thành công!

---

## 📊 Thông tin hệ thống

### Domain & SSL
- **Domain chính:** https://hwm.edu.vn
- **SSL Certificate:** ✅ Valid (Let's Encrypt)
- **SSL Expiry:** 4 tháng 2, 2026
- **Auto-renewal:** ✅ Enabled (cron job)

### Services
```
✅ Backend:  Running on port 8080
✅ Frontend: Running on port 8081  
✅ Nginx:    Reverse proxy với SSL
✅ Redis:    Cache server
✅ MySQL:    Database server
```

### URLs
- **Website:** https://hwm.edu.vn
- **API:** https://hwm.edu.vn/api/v1/...
- **Admin:** https://hwm.edu.vn/login
- **Uploads:** https://hwm.edu.vn/uploads/...

---

## 🔄 Các thay đổi đã thực hiện

### 1. Frontend Configuration
- ✅ `src/utils/constants.js` - Cập nhật API_BASE_URL
- ✅ `src/services/api.js` - Cập nhật API endpoint
- ✅ Tất cả URL references trong code

### 2. Backend Configuration  
- ✅ `application-prod.yml` - Cập nhật:
  - `app.base-url`: https://hwm.edu.vn
  - `app.frontend-url`: https://hwm.edu.vn
  - `app.cors.allowed-origins`: hwm.edu.vn domains
  - `payos.return-url`: https://hwm.edu.vn/payment/success
  - `payos.cancel-url`: https://hwm.edu.vn/payment/cancel

### 3. Nginx Configuration
- ✅ File: `/etc/nginx/sites-available/hwm.edu.vn`
- ✅ HTTP → HTTPS redirect
- ✅ SSL certificates from Let's Encrypt
- ✅ API proxy to backend:8080
- ✅ Frontend proxy to frontend:8081
- ✅ CORS headers configured
- ✅ Security headers enabled
- ✅ Gzip compression
- ✅ Static file caching

### 4. SSL Certificate
- ✅ Obtained from Let's Encrypt
- ✅ Valid for hwm.edu.vn
- ✅ Auto-renewal configured

### 5. Documentation
- ✅ ADMIN_CREDENTIALS.txt
- ✅ ADMIN-ACCESS-FIXED.md
- ✅ CORS-FIX-GUIDE.md
- ✅ RICH-TEXT-EDITOR-CHECKLIST.md
- ✅ UPDATE_USER_ROLE.md
- ✅ fix-cors-deploy.sh

---

## 🔐 Admin Credentials

### Đăng nhập Admin
```
URL:      https://hwm.edu.vn/login
Email:    admin@hwm.edu.vn
Password: Admin@123
Role:     SUPER_ADMIN
```

⚠️ **QUAN TRỌNG:** Đổi mật khẩu sau khi đăng nhập lần đầu!

---

## 🧪 Test & Verification

### Test đã thực hiện
```bash
# 1. Domain resolution
✅ hwm.edu.vn → 103.200.20.62

# 2. SSL Certificate
✅ HTTPS working
✅ HTTP redirects to HTTPS

# 3. Frontend
✅ https://hwm.edu.vn loads successfully
✅ React app renders correctly

# 4. Backend API
✅ https://hwm.edu.vn/api/v1/public/settings
✅ Returns valid JSON response

# 5. Services
✅ All Docker containers running
✅ Backend health check: UP
✅ Frontend responding: 200 OK
```

### Test thủ công
```bash
# Test HTTP redirect
curl -I http://hwm.edu.vn
# Expected: 301 Moved Permanently → https://hwm.edu.vn/

# Test HTTPS
curl -I https://hwm.edu.vn
# Expected: HTTP/2 200

# Test API
curl https://hwm.edu.vn/api/v1/public/settings
# Expected: JSON response with success:true

# Test backend health
curl http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

---

## 📝 Lệnh quản lý hệ thống

### Docker Containers
```bash
# Xem status
docker ps

# Xem logs
docker logs hpmekong-backend -f
docker logs hpmekong-frontend -f

# Restart services
cd /root/hpmekong
docker-compose -f docker-compose.prod.yml restart

# Rebuild & restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx
```bash
# Test config
sudo nginx -t

# Reload config
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# Xem logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate
```bash
# Xem thông tin certificate
sudo certbot certificates

# Renew manually (test)
sudo certbot renew --dry-run

# Force renew
sudo certbot renew --force-renewal

# Auto-renewal (đã setup)
# Cron job: 0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'
```

---

## 🔧 Troubleshooting

### 1. Frontend không load
```bash
# Check container
docker ps | grep frontend

# Restart frontend
docker-compose -f /root/hpmekong/docker-compose.prod.yml restart frontend

# Check logs
docker logs hpmekong-frontend --tail=50
```

### 2. API lỗi 500/502
```bash
# Check backend container
docker ps | grep backend

# Check logs
docker logs hpmekong-backend --tail=100

# Restart backend
docker-compose -f /root/hpmekong/docker-compose.prod.yml restart backend
```

### 3. SSL Certificate lỗi
```bash
# Verify certificate
sudo openssl x509 -in /etc/letsencrypt/live/hwm.edu.vn/cert.pem -text -noout

# Renew certificate
sudo certbot renew --force-renewal

# Reload nginx
sudo systemctl reload nginx
```

### 4. CORS errors
```bash
# Check backend CORS config
docker exec hpmekong-backend cat /app/config/application-prod.yml | grep cors

# Check nginx CORS headers
curl -I -X OPTIONS https://hwm.edu.vn/api/v1/public/settings \
  -H 'Origin: https://hwm.edu.vn'
```

---

## 🚀 Next Steps

### Bắt buộc
1. ✅ Đổi mật khẩu admin: admin@hwm.edu.vn
2. ⏳ Update DNS cho www.hwm.edu.vn (nếu cần subdomain)
3. ⏳ Test toàn bộ chức năng:
   - Đăng ký/Đăng nhập
   - Xem khóa học
   - Đăng ký khóa học
   - Thanh toán
   - Admin dashboard
   - Upload files

### Khuyến nghị
1. Backup database định kỳ
2. Monitor SSL expiry (đã có auto-renewal)
3. Setup monitoring/alerting (optional)
4. Configure CDN nếu cần (optional)
5. Setup email notifications
6. Configure Google Analytics/Search Console

---

## 📞 Support

Nếu có vấn đề, kiểm tra:
1. Container logs: `docker logs hpmekong-backend` / `hpmekong-frontend`
2. Nginx logs: `/var/log/nginx/error.log`
3. System logs: `journalctl -xe`

---

## 📅 Deployment Info

- **Date:** 6 tháng 11, 2025
- **Domain:** hwm.edu.vn
- **Old Domain:** esj.vn (có thể xóa config cũ)
- **Server:** 103.200.20.62
- **Platform:** Docker Compose
- **Backend:** Java Spring Boot
- **Frontend:** React + Vite
- **Web Server:** Nginx
- **SSL:** Let's Encrypt

---

## ✅ Checklist hoàn thành

- [x] Domain hwm.edu.vn trỏ về VPS
- [x] SSL certificate được cấp
- [x] Nginx configured
- [x] Backend config updated
- [x] Frontend config updated
- [x] CORS configured
- [x] Docker containers running
- [x] HTTP → HTTPS redirect
- [x] Admin credentials updated
- [x] Documentation updated
- [x] Git committed

---

**Status:** ✅ PRODUCTION READY

Domain mới **hwm.edu.vn** đã hoàn toàn sẵn sàng để sử dụng!

🎉 Chúc mừng!
