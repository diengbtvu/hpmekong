#!/bin/bash

# Quick CORS fix deployment script
# Run this after fixing CORS issues

set -e

echo "=========================================="
echo "CORS Fix - Rebuild & Redeploy"
echo "=========================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Step 1: Stopping containers...${NC}"
docker-compose -f docker-compose.prod.yml down

echo -e "${GREEN}Step 2: Rebuilding backend (with CORS fixes)...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache backend

echo -e "${GREEN}Step 3: Rebuilding frontend (with nginx CORS fixes)...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache frontend

echo -e "${GREEN}Step 4: Starting all services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${GREEN}Step 5: Waiting for services to initialize...${NC}"
sleep 15

echo -e "${GREEN}Step 6: Checking container status...${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${GREEN}Step 7: Checking backend logs for CORS config...${NC}"
docker-compose -f docker-compose.prod.yml logs backend | grep -i "cors\|origin" | tail -20 || echo "No CORS logs found"

echo -e "${GREEN}=========================================="
echo -e "CORS Fix Deployment Complete!"
echo -e "==========================================${NC}"
echo ""
echo -e "${YELLOW}Testing CORS:${NC}"
echo "curl -I -X OPTIONS http://localhost:8081/api/v1/public/settings \\"
echo "  -H 'Origin: https://esj.vn' \\"
echo "  -H 'Access-Control-Request-Method: GET'"
echo ""
echo -e "${YELLOW}View logs:${NC}"
echo "docker-compose -f docker-compose.prod.yml logs -f backend"
echo "docker-compose -f docker-compose.prod.yml logs -f frontend"
