# 🚀 HƯỚNG DẪN DEPLOY LÊN VPS

## 📋 Yêu cầu VPS

### Cấu hình tối thiểu
- **CPU**: 2 cores
- **RAM**: 4GB
- **Disk**: 40GB SSD
- **OS**: Ubuntu 20.04/22.04 LTS hoặc CentOS 7/8

### Cấu hình khuyến nghị
- **CPU**: 4 cores
- **RAM**: 8GB
- **Disk**: 80GB SSD
- **OS**: Ubuntu 22.04 LTS

## 🔧 Cài đặt môi trường

### 1. Update hệ thống
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Cài đặt Java 17
```bash
sudo apt install openjdk-17-jdk -y
java -version
```

### 3. Cài đặt MySQL
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Tạo database và user
sudo mysql -u root -p
```

```sql
CREATE DATABASE happyworld_mekong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'happyworld'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON happyworld_mekong.* TO 'happyworld'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Cài đặt Redis (Optional nhưng khuyến nghị)
```bash
sudo apt install redis-server -y
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### 5. Cài đặt Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

## 📦 Deploy Application

### 1. Tạo thư mục cho application
```bash
sudo mkdir -p /var/www/happyworld-mekong
sudo mkdir -p /var/www/happyworld-mekong/uploads
sudo chown -R $USER:$USER /var/www/happyworld-mekong
```

### 2. Upload file JAR
```bash
# Trên máy local, build project
mvn clean package -DskipTests

# Upload lên VPS (dùng SCP hoặc SFTP)
scp target/mekong-backend-1.0.0.jar user@your-vps-ip:/var/www/happyworld-mekong/
```

### 3. Tạo file môi trường
```bash
nano /var/www/happyworld-mekong/.env
```

Nội dung file `.env`:
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=happyworld_mekong
DB_USERNAME=happyworld
DB_PASSWORD=your_strong_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your_very_long_and_secure_secret_key_minimum_256_bits_here
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Email (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_app_password

# File Upload
FILE_UPLOAD_PATH=/var/www/happyworld-mekong/uploads
FILE_UPLOAD_MAX_SIZE=52428800

# Application
APP_BASE_URL=https://api.yourdomain.com
APP_FRONTEND_URL=https://yourdomain.com
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### 4. Tạo systemd service
```bash
sudo nano /etc/systemd/system/happyworld-backend.service
```

Nội dung:
```ini
[Unit]
Description=Happy World Mekong Backend
After=mysql.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/var/www/happyworld-mekong
EnvironmentFile=/var/www/happyworld-mekong/.env
ExecStart=/usr/bin/java -jar /var/www/happyworld-mekong/mekong-backend-1.0.0.jar
SuccessExitStatus=143
TimeoutStopSec=10
Restart=on-failure
RestartSec=5

# Logging
StandardOutput=append:/var/log/happyworld-backend/application.log
StandardError=append:/var/log/happyworld-backend/error.log

[Install]
WantedBy=multi-user.target
```

### 5. Tạo thư mục logs
```bash
sudo mkdir -p /var/log/happyworld-backend
sudo chown www-data:www-data /var/log/happyworld-backend
```

### 6. Start service
```bash
sudo systemctl daemon-reload
sudo systemctl enable happyworld-backend
sudo systemctl start happyworld-backend

# Check status
sudo systemctl status happyworld-backend

# View logs
sudo journalctl -u happyworld-backend -f
```

## 🌐 Cấu hình Nginx

### 1. Tạo Nginx config
```bash
sudo nano /etc/nginx/sites-available/happyworld-backend
```

Nội dung:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    # File upload size limit
    client_max_body_size 50M;

    # Serve static files (uploads)
    location /uploads/ {
        alias /var/www/happyworld-mekong/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy API requests to Spring Boot
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support (nếu cần)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Logs
    access_log /var/log/nginx/happyworld-backend-access.log;
    error_log /var/log/nginx/happyworld-backend-error.log;
}
```

### 2. Enable site
```bash
sudo ln -s /etc/nginx/sites-available/happyworld-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Setup SSL với Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 🔒 Bảo mật

### 1. Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Fail2Ban (Chống brute force)
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Tắt truy cập trực tiếp port 8080
```bash
sudo ufw deny 8080
```

## 📊 Monitoring & Maintenance

### 1. Check logs
```bash
# Application logs
sudo journalctl -u happyworld-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/happyworld-backend-access.log
sudo tail -f /var/log/nginx/happyworld-backend-error.log
```

### 2. Restart services
```bash
sudo systemctl restart happyworld-backend
sudo systemctl restart nginx
```

### 3. Database backup
```bash
# Tạo script backup
sudo nano /usr/local/bin/backup-db.sh
```

Nội dung:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mysql"
mkdir -p $BACKUP_DIR

mysqldump -u happyworld -p'your_password' happyworld_mekong | gzip > $BACKUP_DIR/happyworld_$DATE.sql.gz

# Xóa backup cũ hơn 7 ngày
find $BACKUP_DIR -name "happyworld_*.sql.gz" -mtime +7 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-db.sh

# Crontab - backup mỗi ngày lúc 2h sáng
sudo crontab -e
# Thêm dòng:
0 2 * * * /usr/local/bin/backup-db.sh
```

## 🔄 Update Application

### 1. Build new version
```bash
# Trên local
mvn clean package -DskipTests
```

### 2. Upload và restart
```bash
# Upload file mới
scp target/mekong-backend-1.0.0.jar user@vps:/var/www/happyworld-mekong/

# Trên VPS
sudo systemctl restart happyworld-backend
```

## 📝 Checklist sau khi deploy

- [ ] Application chạy thành công (`systemctl status happyworld-backend`)
- [ ] Database migration completed
- [ ] Nginx proxy hoạt động
- [ ] SSL certificate được cài đặt
- [ ] File upload hoạt động
- [ ] Email service hoạt động
- [ ] Redis kết nối thành công
- [ ] Firewall được cấu hình
- [ ] Backup database được setup
- [ ] Monitoring logs

## 🆘 Troubleshooting

### Application không start
```bash
# Check logs
sudo journalctl -u happyworld-backend -n 100 --no-pager

# Check Java version
java -version

# Check ports
sudo netstat -tulpn | grep 8080
```

### Database connection failed
```bash
# Check MySQL status
sudo systemctl status mysql

# Test connection
mysql -u happyworld -p happyworld_mekong
```

### File upload không hoạt động
```bash
# Check permissions
ls -la /var/www/happyworld-mekong/uploads
sudo chown -R www-data:www-data /var/www/happyworld-mekong/uploads
sudo chmod -R 755 /var/www/happyworld-mekong/uploads
```

---

**Last Updated**: January 2025  
**Version**: 1.0  
**VPS Deployment Guide** ✅

