#!/bin/bash

echo "========================================"
echo "  Happy World Mekong Backend"
echo "  Development Server"
echo "========================================"
echo ""

echo "Checking Java version..."
java -version
echo ""

echo "Starting backend server..."
echo ""

mvn spring-boot:run -Dspring-boot.run.profiles=dev

