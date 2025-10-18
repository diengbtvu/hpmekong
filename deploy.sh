#!/bin/bash

# Deploy script for Happy World Mekong
# This script should be run on the VPS - test

set -e

echo "=========================================="
echo "Happy World Mekong - Deployment Script"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo -e "${RED}Error: .env.production file not found!${NC}"
    echo "Please create .env.production from env-production.txt"
    exit 1
fi

# Load environment variables
set -a
source .env.production
set +a

echo -e "${GREEN}Step 1: Pulling latest code...${NC}"
git pull origin main || git pull origin master

echo -e "${GREEN}Step 2: Stopping running containers...${NC}"
docker-compose -f docker-compose.prod.yml down

echo -e "${GREEN}Step 3: Building Docker images...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${GREEN}Step 4: Starting containers...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${GREEN}Step 5: Waiting for services to start...${NC}"
sleep 30

echo -e "${GREEN}Step 6: Checking service status...${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${GREEN}Step 7: Testing backend health...${NC}"
curl -f http://localhost:8080/actuator/health || echo -e "${YELLOW}Warning: Backend health check failed${NC}"

echo -e "${GREEN}Step 8: Testing frontend...${NC}"
curl -f http://localhost/ || echo -e "${YELLOW}Warning: Frontend check failed${NC}"

echo -e "${GREEN}Step 9: Cleaning up old images...${NC}"
docker system prune -af --filter "until=24h"

echo -e "${GREEN}=========================================="
echo -e "Deployment completed successfully!"
echo -e "==========================================${NC}"
echo ""
echo "Backend: http://$(hostname -I | awk '{print $1}'):8080"
echo "Frontend: http://$(hostname -I | awk '{print $1}')"
echo ""
echo "To view logs:"
echo "  docker-compose -f docker-compose.prod.yml logs -f backend"
echo "  docker-compose -f docker-compose.prod.yml logs -f frontend"

