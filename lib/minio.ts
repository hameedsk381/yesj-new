import { Client } from "minio"

if (!process.env.MINIO_ENDPOINT) {
  throw new Error("MINIO_ENDPOINT is required in .env file")
}

if (!process.env.MINIO_ACCESS_KEY) {
  throw new Error("MINIO_ACCESS_KEY is required in .env file")
}

if (!process.env.MINIO_SECRET_KEY) {
  throw new Error("MINIO_SECRET_KEY is required in .env file")
}

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
})

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || "aicuf-uploads"

// Initialize bucket if it doesn't exist
async function ensureBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME)
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, "us-east-1")
      
      // Set public read policy for the bucket
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
          },
        ],
      }
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy))
    }
  } catch (error) {
    console.error("Error ensuring bucket exists:", error)
  }
}

// Initialize on module load
ensureBucket()

export { minioClient, BUCKET_NAME }
