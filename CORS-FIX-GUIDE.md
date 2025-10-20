# Hướng Dẫn Fix CORS - Happy World Mekong

## 🔍 Vấn đề đã phát hiện

Ứng dụng bị lỗi CORS khi chạy trên production với Docker + Nginx do:

1. **SecurityConfig.java** hardcode localhost origins thay vì đọc từ config
2. **nginx.conf** thiếu CORS headers cho API proxy
3. Thiếu xử lý preflight OPTIONS requests
4. Thiếu CORS headers cho static assets

## ✅ Các thay đổi đã thực hiện

### 1. Backend - SecurityConfig.java
- ✅ Thêm `@Value` annotations để đọc CORS config từ `application-prod.yml`
- ✅ Replace hardcoded localhost origins bằng dynamic configuration
- ✅ Support multiple production domains (esj.vn, IP address, www subdomain)

### 2. Nginx Configuration
- ✅ Thêm CORS headers cho tất cả API proxy requests
- ✅ Xử lý preflight OPTIONS requests
- ✅ Thêm CORS headers cho static assets
- ✅ Thêm CORS headers cho React Router routes

### 3. Production Configuration
- ✅ Cập nhật `application-prod.yml` với đầy đủ production origins:
  - https://esj.vn
  - http://esj.vn
  - https://www.esj.vn
  - http://www.esj.vn
  - http://103.200.20.62
  - https://103.200.20.62
  - http://103.200.20.62:8081
  - https://103.200.20.62:8081

## 🚀 Cách Deploy Fix

### Bước 1: Chạy script tự động (Khuyến nghị)
```bash
./fix-cors-deploy.sh
```

### Bước 2: Hoặc chạy manual
```bash
# Stop containers
docker-compose -f docker-compose.prod.yml down

# Rebuild với no-cache
docker-compose -f docker-compose.prod.yml build --no-cache

# Start lại
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## 🧪 Cách Test CORS

### Test 1: Preflight OPTIONS request
```bash
curl -I -X OPTIONS http://103.200.20.62:8081/api/v1/public/settings \
  -H 'Origin: https://esj.vn' \
  -H 'Access-Control-Request-Method: GET' \
  -H 'Access-Control-Request-Headers: Content-Type'
```

**Kết quả mong đợi:**
```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://esj.vn
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, Accept, Origin, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### Test 2: Actual GET request
```bash
curl -i http://103.200.20.62:8081/api/v1/public/settings \
  -H 'Origin: https://esj.vn'
```

**Kết quả mong đợi:**
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://esj.vn
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, Accept, Origin, X-Requested-With
Access-Control-Allow-Credentials: true
Content-Type: application/json
```

### Test 3: Test từ browser console
Mở browser console trên https://esj.vn và chạy:

```javascript
fetch('http://103.200.20.62:8081/api/v1/public/settings', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('CORS Error:', error));
```

### Test 4: Kiểm tra backend logs
```bash
docker-compose -f docker-compose.prod.yml logs backend | grep -i "cors\|origin"
```

## 🔧 Troubleshooting

### Vấn đề: Vẫn bị CORS sau khi deploy

1. **Check containers đã restart chưa:**
```bash
docker-compose -f docker-compose.prod.yml ps
```

2. **Check nginx config:**
```bash
docker exec hpmekong-frontend cat /etc/nginx/conf.d/default.conf | grep -A 20 "location /api"
```

3. **Check backend logs:**
```bash
docker-compose -f docker-compose.prod.yml logs backend | tail -100
```

4. **Verify Spring profile:**
```bash
docker-compose -f docker-compose.prod.yml exec backend env | grep SPRING_PROFILES_ACTIVE
```
Phải là: `SPRING_PROFILES_ACTIVE=prod`

### Vấn đề: Backend không đọc được CORS config

Check application-prod.yml có được load không:
```bash
docker-compose -f docker-compose.prod.yml logs backend | grep "The following 1 profile is active: prod"
```

### Vấn đề: Nginx không proxy đúng

Test direct backend:
```bash
curl http://localhost:8080/api/v1/public/settings
```

Test qua nginx:
```bash
curl http://localhost:8081/api/v1/public/settings
```

## 📝 Files đã thay đổi

1. `backend/src/main/java/com/happyworld/mekong/config/SecurityConfig.java`
2. `backend/src/main/resources/application-prod.yml`
3. `nginx.conf`
4. `fix-cors-deploy.sh` (new file)

## ⚠️ Lưu ý quan trọng

1. **Luôn test CORS sau khi deploy** bằng các lệnh curl ở trên
2. **Check browser console** để xem chi tiết CORS errors
3. **Review nginx logs** nếu có vấn đề: `docker-compose -f docker-compose.prod.yml logs frontend`
4. **Backup** trước khi deploy: `docker-compose -f docker-compose.prod.yml down` sẽ không xóa data
5. Nếu cần thêm domain mới, thêm vào `application-prod.yml` section `app.cors.allowed-origins`

## 🎯 Checklist sau khi deploy

- [ ] Containers đang chạy: `docker-compose -f docker-compose.prod.yml ps`
- [ ] Backend health OK: `curl http://localhost:8080/actuator/health`
- [ ] Frontend OK: `curl http://localhost:8081/`
- [ ] CORS OPTIONS test pass
- [ ] CORS GET test pass
- [ ] Test từ browser console pass
- [ ] Không có CORS errors trong browser console
- [ ] API calls từ frontend hoạt động bình thường

## 📞 Support

Nếu vẫn gặp vấn đề CORS sau khi thực hiện các bước trên:

1. Gửi kết quả của: `docker-compose -f docker-compose.prod.yml logs backend | tail -200`
2. Gửi kết quả của: `docker-compose -f docker-compose.prod.yml logs frontend | tail -200`
3. Gửi screenshot CORS error từ browser console (F12 > Console tab)
4. Gửi kết quả test CORS commands ở trên
