import { Storage } from "@google-cloud/storage"

function getBucketName() {
  return process.env.GCS_BUCKET_NAME || "yesj-uploads"
}

// Singleton pattern for GCS client
let gcsInstance: Storage | null = null

function getGCSClient() {
  if (!process.env.GCS_PROJECT_ID) {
    // Only warn during build, don't crash
    console.warn("GCS_PROJECT_ID is missing. Storage functionality will be disabled.")
    return null
  }

  if (!gcsInstance) {
    gcsInstance = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    })
  }

  return gcsInstance
}

/**
 * Uploads a file to GCS and returns the public URL
 */
export async function uploadFile(file: File | Buffer, destination: string, contentType?: string): Promise<string> {
  const storage = getGCSClient()
  if (!storage) throw new Error("GCS storage client not initialized")
  
  const bucketName = getBucketName()
  const bucket = storage.bucket(bucketName)
  const gcsFile = bucket.file(destination)

  let buffer: Buffer
  if (Buffer.isBuffer(file)) {
    buffer = file
  } else if (typeof File !== 'undefined' && file instanceof File) {
    buffer = Buffer.from(await file.arrayBuffer())
    if (!contentType) contentType = file.type
  } else if (file instanceof ArrayBuffer) {
    buffer = Buffer.from(file)
  } else {
    // Fallback if it's something else that can be buffered
    buffer = Buffer.from(file as any)
  }

  await gcsFile.save(buffer, {
    metadata: {
      contentType: contentType,
    },
    resumable: false,
  })

  return `https://storage.googleapis.com/${bucketName}/${destination}`
}

/**
 * Gets a file from GCS as a Buffer
 */
export async function getFile(path: string): Promise<{ buffer: Buffer; metadata: any }> {
  const storage = getGCSClient()
  if (!storage) throw new Error("GCS storage client not initialized")

  const bucketName = getBucketName()
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(path)

  const [buffer] = await file.download()
  const [metadata] = await file.getMetadata()

  return { buffer, metadata }
}

export { getBucketName }
