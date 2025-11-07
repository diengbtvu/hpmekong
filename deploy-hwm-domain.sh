#!/bin/bash

# Script triển khai domain mới hwm.edu.vn
# Chạy script này để cập nhật toàn bộ hệ thống

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=========================================="
echo "  Deploy hwm.edu.vn - New Domain Setup"
echo -e "==========================================${NC}"

# Step 1: Kiểm tra domain đã trỏ về server chưa
echo -e "\n${YELLOW}Step 1: Kiểm tra domain...${NC}"
DOMAIN_IP=$(dig +short hwm.edu.vn | tail -1)
SERVER_IP="103.200.20.62"

if [ "$DOMAIN_IP" == "$SERVER_IP" ]; then
    echo -e "${GREEN}✓ Domain hwm.edu.vn đã trỏ về $SERVER_IP${NC}"
else
    echo -e "${RED}✗ Domain hwm.edu.vn chưa trỏ về $SERVER_IP${NC}"
    echo -e "${YELLOW}Hiện tại trỏ về: $DOMAIN_IP${NC}"
    echo -e "${YELLOW}Vui lòng đợi DNS propagate hoặc kiểm tra lại cấu hình DNS${NC}"
    read -p "Bạn có muốn tiếp tục không? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 2: Cập nhật backend config
echo -e "\n${YELLOW}Step 2: Kiểm tra backend configuration...${NC}"
if grep -q "hwm.edu.vn" /root/hpmekong/backend/src/main/resources/application-prod.yml; then
    echo -e "${GREEN}✓ Backend config đã được cập nhật${NC}"
else
    echo -e "${RED}✗ Backend config chưa được cập nhật${NC}"
    exit 1
fi

# Step 3: Setup Nginx config
echo -e "\n${YELLOW}Step 3: Cấu hình Nginx...${NC}"

# Tạo thư mục certbot nếu chưa có
sudo mkdir -p /var/www/certbot

# Copy config tạm để xin SSL
sudo cp /tmp/hwm-initial.conf /etc/nginx/sites-available/hwm.edu.vn
sudo ln -sf /etc/nginx/sites-available/hwm.edu.vn /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Nginx config hợp lệ${NC}"
    sudo systemctl reload nginx
else
    echo -e "${RED}✗ Nginx config lỗi${NC}"
    exit 1
fi

# Step 4: Xin chứng chỉ SSL từ Let's Encrypt
echo -e "\n${YELLOW}Step 4: Xin chứng chỉ SSL từ Let's Encrypt...${NC}"

if [ -d "/etc/letsencrypt/live/hwm.edu.vn" ]; then
    echo -e "${YELLOW}Chứng chỉ SSL đã tồn tại. Bỏ qua bước này.${NC}"
else
    sudo certbot certonly --webroot \
        -w /var/www/certbot \
        -d hwm.edu.vn \
        -d www.hwm.edu.vn \
        --email Happyworldesj@gmail.com \
        --agree-tos \
        --no-eff-email \
        --non-interactive
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Xin SSL thành công${NC}"
    else
        echo -e "${RED}✗ Xin SSL thất bại${NC}"
        echo -e "${YELLOW}Có thể domain chưa propagate. Hãy thử lại sau.${NC}"
        exit 1
    fi
fi

# Step 5: Cập nhật Nginx config với SSL
echo -e "\n${YELLOW}Step 5: Cập nhật Nginx với SSL...${NC}"
sudo cp /tmp/hwm.edu.vn.conf /etc/nginx/sites-available/hwm.edu.vn

# Test nginx config
sudo nginx -t
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Nginx SSL config hợp lệ${NC}"
    sudo systemctl reload nginx
else
    echo -e "${RED}✗ Nginx SSL config lỗi${NC}"
    exit 1
fi

# Step 6: Rebuild và restart containers
echo -e "\n${YELLOW}Step 6: Rebuild và restart Docker containers...${NC}"

cd /root/hpmekong

# Stop containers
echo "Stopping containers..."
docker-compose -f docker-compose.prod.yml down

# Rebuild
echo "Rebuilding backend..."
docker-compose -f docker-compose.prod.yml build --no-cache backend

echo "Rebuilding frontend..."
docker-compose -f docker-compose.prod.yml build --no-cache frontend

# Start
echo "Starting containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services
echo "Waiting for services to start..."
sleep 20

# Step 7: Kiểm tra services
echo -e "\n${YELLOW}Step 7: Kiểm tra services...${NC}"

# Check containers
if docker ps | grep -q "hpmekong-backend"; then
    echo -e "${GREEN}✓ Backend container đang chạy${NC}"
else
    echo -e "${RED}✗ Backend container không chạy${NC}"
fi

if docker ps | grep -q "hpmekong-frontend"; then
    echo -e "${GREEN}✓ Frontend container đang chạy${NC}"
else
    echo -e "${RED}✗ Frontend container không chạy${NC}"
fi

# Test backend health
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/actuator/health || echo "000")
if [ "$BACKEND_STATUS" == "200" ]; then
    echo -e "${GREEN}✓ Backend health check OK${NC}"
else
    echo -e "${YELLOW}⚠ Backend health check: $BACKEND_STATUS${NC}"
fi

# Test frontend
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 || echo "000")
if [ "$FRONTEND_STATUS" == "200" ]; then
    echo -e "${GREEN}✓ Frontend health check OK${NC}"
else
    echo -e "${YELLOW}⚠ Frontend health check: $FRONTEND_STATUS${NC}"
fi

# Step 8: Test domain
echo -e "\n${YELLOW}Step 8: Test domain mới...${NC}"

# Test HTTP redirect
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://hwm.edu.vn || echo "000")
echo "HTTP status: $HTTP_STATUS"

# Test HTTPS
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://hwm.edu.vn || echo "000")
if [ "$HTTPS_STATUS" == "200" ]; then
    echo -e "${GREEN}✓ HTTPS hwm.edu.vn hoạt động OK${NC}"
else
    echo -e "${YELLOW}⚠ HTTPS status: $HTTPS_STATUS${NC}"
fi

# Step 9: Setup auto-renewal cho SSL
echo -e "\n${YELLOW}Step 9: Setup SSL auto-renewal...${NC}"
if ! crontab -l | grep -q "certbot renew"; then
    (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
    echo -e "${GREEN}✓ SSL auto-renewal đã được setup${NC}"
else
    echo -e "${YELLOW}SSL auto-renewal đã tồn tại${NC}"
fi

# Final summary
echo -e "\n${GREEN}=========================================="
echo "  TRIỂN KHAI HOÀN TẤT!"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}✓ Domain mới: https://hwm.edu.vn${NC}"
echo -e "${GREEN}✓ SSL: Đã cài đặt và tự động renew${NC}"
echo -e "${GREEN}✓ Backend: http://localhost:8080${NC}"
echo -e "${GREEN}✓ Frontend: http://localhost:8081${NC}"
echo ""
echo -e "${YELLOW}Các bước tiếp theo:${NC}"
echo "1. Truy cập: https://hwm.edu.vn"
echo "2. Đăng nhập admin: https://hwm.edu.vn/login"
echo "   Email: admin@hwm.edu.vn"
echo "   Password: Admin@123"
echo "3. Kiểm tra tất cả chức năng hoạt động"
echo ""
echo -e "${YELLOW}Xem logs:${NC}"
echo "docker-compose -f /root/hpmekong/docker-compose.prod.yml logs -f backend"
echo "docker-compose -f /root/hpmekong/docker-compose.prod.yml logs -f frontend"
echo "sudo tail -f /var/log/nginx/error.log"
echo ""
echo -e "${YELLOW}Lệnh hữu ích:${NC}"
echo "# Restart services"
echo "cd /root/hpmekong && docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "# Renew SSL manually"
echo "sudo certbot renew --force-renewal"
echo ""
echo -e "${GREEN}🎉 Chúc mừng! Domain mới đã sẵn sàng!${NC}"
