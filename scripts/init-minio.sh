#!/bin/sh
# Initialize MinIO bucket for production

echo "Initializing MinIO bucket..."

# Wait for MinIO to be ready
until mc alias set local http://minio:9000 ${MINIO_ACCESS_KEY:-minioadmin} ${MINIO_SECRET_KEY:-minioadmin} 2>/dev/null; do
  echo "Waiting for MinIO..."
  sleep 2
done

# Create bucket if it doesn't exist
mc mb local/${MINIO_BUCKET_NAME:-aicuf-uploads} --ignore-existing

# Set public download policy
mc anonymous set download local/${MINIO_BUCKET_NAME:-aicuf-uploads}

echo "✅ MinIO bucket initialized successfully!"
