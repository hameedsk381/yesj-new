# YESJ Website - Docker Guide

## Build and Run with Docker

### Quick Start (Docker only)

1. **Build the image:**
```bash
docker build -t yesj-website .

```

2. **Run the container:**
```bash
docker run -d \
  --name yesj-web \
  -p 3000:3000 \
  --env-file .env \
  -v yesj-uploads:/app/public/uploads \
  --restart unless-stopped \
  yesj-website
```

3. **View logs:**
```bash
docker logs -f yesj-web
```

4. **Stop container:**
```bash
docker stop yesj-web
```

5. **Remove container:**
```bash
docker rm yesj-web
```

## Environment Variables

Make sure your `.env` file is configured before running:

```bash
cp .env.example .env
# Edit .env with your actual values
```

Or pass environment variables directly:

```bash
docker run -d \
  --name yesj-web \
  -p 3000:3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  -e ADMIN_TOKEN="your-token" \
  -e ADMIN_USERNAME="admin" \
  -e ADMIN_PASSWORD="password" \
  -v yesj-uploads:/app/public/uploads \
  yesj-website
```

## Access

- Application: http://localhost:3000
- Admin Panel: http://localhost:3000/admin/login

## Production Deployment

### Push to Docker Registry

```bash
# Tag image
docker tag yesj-website:latest your-registry/yesj-website:latest

# Push to registry
docker push your-registry/yesj-website:latest
```

### Deploy on Production Server

```bash
# Pull image
docker pull your-registry/yesj-website:latest

# Run container
docker run -d \
  --name yesj-web \
  -p 80:3000 \
  --env-file .env.production \
  -v /var/yesj/uploads:/app/public/uploads \
  --restart unless-stopped \
  your-registry/yesj-website:latest
```

## Common Commands

**Rebuild image:**
```bash
docker build --no-cache -t yesj-website .
```

**Restart container:**
```bash
docker restart yesj-web
```

**View container stats:**
```bash
docker stats yesj-web
```

**Execute commands inside container:**
```bash
docker exec -it yesj-web sh
```

**Check uploaded files:**
```bash
docker exec -it yesj-web ls -la /app/public/uploads/noc
```

## Troubleshooting

**Container fails to start:**
```bash
docker logs yesj-web
```

**Check if container is running:**
```bash
docker ps -a
```

**Remove old containers and images:**
```bash
docker rm yesj-web
docker rmi yesj-website
```

**Permission issues with uploads:**
```bash
docker exec -it yesj-web ls -la /app/public/uploads
```
