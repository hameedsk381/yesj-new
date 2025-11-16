#!/bin/bash
# Docker run command with persistent volumes for data and uploads

# Build the image
docker build -t aicuf-website .

# Stop and remove existing containers if they exist
docker stop aicuf-postgres aicuf-minio aicuf-website 2>/dev/null
docker rm aicuf-postgres aicuf-minio aicuf-website 2>/dev/null

# Create network if it doesn't exist
docker network create aicuf-network 2>/dev/null

# Start PostgreSQL
echo "Starting PostgreSQL..."
docker run -d \
  --name aicuf-postgres \
  --network aicuf-network \
  -v aicuf-postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_USER=aicuf \
  -e POSTGRES_PASSWORD=aicuf_password \
  -e POSTGRES_DB=aicuf \
  --restart unless-stopped \
  postgres:16-alpine

# Start MinIO
echo "Starting MinIO..."
docker run -d \
  --name aicuf-minio \
  --network aicuf-network \
  -v aicuf-minio-data:/data \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  --restart unless-stopped \
  minio/minio server /data --console-address ":9001"

echo "Waiting for services to be ready..."
sleep 5

# Run web application
echo "Starting web application..."
docker run -d \
  --name aicuf-website \
  --network aicuf-network \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://aicuf:aicuf_password@aicuf-postgres:5432/aicuf \
  -e MINIO_ENDPOINT=aicuf-minio \
  -e MINIO_PORT=9000 \
  -e MINIO_USE_SSL=false \
  -e MINIO_ACCESS_KEY=minioadmin \
  -e MINIO_SECRET_KEY=minioadmin \
  -e MINIO_BUCKET_NAME=aicuf-uploads \
  --env-file .env \
  --restart unless-stopped \
  aicuf-website

echo ""
echo "Containers started successfully!"
echo "Persistent volumes:"
echo "  - aicuf-postgres-data (PostgreSQL database - internal only)"
echo "  - aicuf-minio-data (MinIO file storage - internal only)"
echo ""
echo "Access the application at: http://localhost:3000"
