#!/bin/bash
# Docker run command with persistent volumes for data and uploads

# Build the image
docker build -t yesj-website .

# Stop and remove existing containers if they exist
docker stop yesj-postgres yesj-minio yesj-website 2>/dev/null
docker rm yesj-postgres yesj-minio yesj-website 2>/dev/null

# Create network if it doesn't exist
docker network create yesj-network 2>/dev/null

# Start PostgreSQL
echo "Starting PostgreSQL..."
docker run -d \
  --name yesj-postgres \
  --network yesj-network \
  -v yesj-postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_USER=yesj \
  -e POSTGRES_PASSWORD=yesj_password \
  -e POSTGRES_DB=yesj \
  --restart unless-stopped \
  postgres:16-alpine

# Start MinIO
echo "Starting MinIO..."
docker run -d \
  --name yesj-minio \
  --network yesj-network \
  -v yesj-minio-data:/data \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  --restart unless-stopped \
  minio/minio server /data --console-address ":9001"

echo "Waiting for services to be ready..."
sleep 5

# Run web application
echo "Starting web application..."
docker run -d \
  --name yesj-website \
  --network yesj-network \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://yesj:yesj_password@yesj-postgres:5432/yesj \
  -e MINIO_ENDPOINT=yesj-minio \
  -e MINIO_PORT=9000 \
  -e MINIO_USE_SSL=false \
  -e MINIO_ACCESS_KEY=minioadmin \
  -e MINIO_SECRET_KEY=minioadmin \
  -e MINIO_BUCKET_NAME=yesj-uploads \
  --env-file .env \
  --restart unless-stopped \
  yesj-website

echo ""
echo "Containers started successfully!"
echo "Persistent volumes:"
echo "  - yesj-postgres-data (PostgreSQL database - internal only)"
echo "  - yesj-minio-data (MinIO file storage - internal only)"
echo ""
echo "Access the application at: http://localhost:3000"