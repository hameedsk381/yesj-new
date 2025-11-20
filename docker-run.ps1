# PowerShell script for Docker deployment with persistent volumes

# Build the image
Write-Host "Building Docker image..." -ForegroundColor Cyan
docker build -t yesj-website .

# Stop and remove existing containers if they exist
Write-Host "Stopping existing containers if any..." -ForegroundColor Yellow
docker stop yesj-postgres yesj-minio yesj-website 2>$null
docker rm yesj-postgres yesj-minio yesj-website 2>$null

# Create network if it doesn't exist
docker network create yesj-network 2>$null

# Start PostgreSQL
Write-Host "Starting PostgreSQL..." -ForegroundColor Green
docker run -d `
  --name yesj-postgres `
  --network yesj-network `
  -v yesj-postgres-data:/var/lib/postgresql/data `
  -e POSTGRES_USER=yesj `
  -e POSTGRES_PASSWORD=yesj_password `
  -e POSTGRES_DB=yesj `
  -p 5433:5432 `
  --restart unless-stopped `
  postgres:16-alpine

# Start MinIO
Write-Host "Starting MinIO..." -ForegroundColor Green
docker run -d `
  --name yesj-minio `
  --network yesj-network `
  -v yesj-minio-data:/data `
  -e MINIO_ROOT_USER=minioadmin `
  -e MINIO_ROOT_PASSWORD=minioadmin `
  --restart unless-stopped `
  minio/minio server /data --console-address ":9001"

Write-Host "Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Run web application
Write-Host "Starting web application..." -ForegroundColor Green
docker run -d `
  --name yesj-website `
  --network yesj-network `
  -p 3000:3000 `
  -e NODE_ENV=production `
  -e DATABASE_URL=postgresql://yesj:yesj_password@yesj-postgres:5432/yesj `
  -e MINIO_ENDPOINT=yesj-minio `
  -e MINIO_PORT=9000 `
  -e MINIO_USE_SSL=false `
  -e MINIO_ACCESS_KEY=minioadmin `
  -e MINIO_SECRET_KEY=minioadmin `
  -e MINIO_BUCKET_NAME=yesj-uploads `
  --env-file .env `
  --restart unless-stopped `
  yesj-website

Write-Host "`nContainers started successfully!" -ForegroundColor Green
Write-Host "Persistent volumes:" -ForegroundColor Cyan
Write-Host "  - yesj-postgres-data (PostgreSQL database - internal only)" -ForegroundColor White
Write-Host "  - yesj-minio-data (MinIO file storage - internal only)" -ForegroundColor White
Write-Host "`nAccess the application at: http://localhost:3000" -ForegroundColor Yellow