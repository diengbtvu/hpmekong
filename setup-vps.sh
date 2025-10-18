#!/bin/bash

# Setup script for VPS - Run this ONCE on VPS
# This script sets up GitHub deploy key for private repository

set -e

echo "=========================================="
echo "VPS Setup for Happy World Mekong"
echo "=========================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Step 1: Generate SSH key for GitHub deploy${NC}"
ssh-keygen -t ed25519 -C "deploy@hpmekong" -f ~/.ssh/github_deploy -N ""

echo ""
echo -e "${YELLOW}Copy this PUBLIC KEY and add to GitHub repo:${NC}"
echo "Go to: GitHub Repo > Settings > Deploy keys > Add deploy key"
echo ""
cat ~/.ssh/github_deploy.pub
echo ""

read -p "Press Enter after you added the deploy key to GitHub..."

echo -e "${GREEN}Step 2: Configure SSH for git${NC}"
mkdir -p ~/.ssh
cat >> ~/.ssh/config << 'EOF'

Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_deploy
    StrictHostKeyChecking no
EOF

chmod 600 ~/.ssh/config

echo -e "${GREEN}Step 3: Test GitHub connection${NC}"
ssh -T git@github.com || echo "GitHub SSH configured"

echo -e "${GREEN}Step 4: Clone repository${NC}"
read -p "Enter your GitHub repo URL (git@github.com:user/repo.git): " REPO_URL
read -p "Enter installation path (default: /home/$USER/hpmekong): " INSTALL_PATH
INSTALL_PATH=${INSTALL_PATH:-/home/$USER/hpmekong}

if [ -d "$INSTALL_PATH" ]; then
    echo "Directory exists, pulling latest..."
    cd $INSTALL_PATH
    git pull
else
    git clone $REPO_URL $INSTALL_PATH
    cd $INSTALL_PATH
fi

echo -e "${GREEN}Step 5: Setup environment file${NC}"
if [ ! -f ".env.production" ]; then
    cp env-production.txt .env.production
    echo -e "${YELLOW}Please edit .env.production with your values:${NC}"
    echo "nano .env.production"
fi

echo -e "${GREEN}Step 6: Create uploads directory${NC}"
mkdir -p uploads
chmod 777 uploads

echo -e "${GREEN}Step 7: Make deploy script executable${NC}"
chmod +x deploy.sh

echo ""
echo "=========================================="
echo -e "${GREEN}Setup completed!${NC}"
echo "=========================================="
echo ""
echo "IMPORTANT: Copy your PRIVATE key for GitHub Actions:"
echo "cat ~/.ssh/github_deploy"
echo ""
echo "Add this to GitHub Secrets as REPO_DEPLOY_KEY"
echo ""
echo "If you already cloned with HTTPS, switch to SSH:"
echo "git remote set-url origin git@github.com:username/hpmekong.git"
echo ""
echo "VPS is ready for deployment!"

