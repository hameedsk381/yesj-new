import * as Minio from "minio"

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
})

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || "aicuf-uploads"

export async function ensureBucketExists() {
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
    throw error
  }
}

export async function uploadFile(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    await ensureBucketExists()

    await minioClient.putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      "Content-Type": contentType,
    })

    const minioEndpoint = process.env.MINIO_ENDPOINT || "localhost"
    const minioPort = process.env.MINIO_PORT || "9000"
    const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http"
    
    return `${protocol}://${minioEndpoint}:${minioPort}/${BUCKET_NAME}/${fileName}`
  } catch (error) {
    console.error("Error uploading file to MinIO:", error)
    throw error
  }
}

export async function deleteFile(fileName: string): Promise<void> {
  try {
    await minioClient.removeObject(BUCKET_NAME, fileName)
  } catch (error) {
    console.error("Error deleting file from MinIO:", error)
    throw error
  }
}

export { minioClient, BUCKET_NAME }
