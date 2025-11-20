/**
 * Test MinIO connection and bucket setup
 * Run with: bun run scripts/test-minio.ts
 */

import { Client } from "minio"

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || "yesj-uploads"

async function testMinIO() {
  console.log("\n=== Testing MinIO Connection ===\n")
  
  const config = {
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt(process.env.MINIO_PORT || "443"),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
  }
  
  console.log("Configuration:", {
    endPoint: config.endPoint,
    port: config.port,
    useSSL: config.useSSL,
    bucket: BUCKET_NAME,
  })
  
  try {
    const client = new Client(config)
    
    // Test 1: Check bucket exists
    console.log("\n1. Checking if bucket exists...")
    const exists = await client.bucketExists(BUCKET_NAME)
    console.log(`   Bucket '${BUCKET_NAME}' exists: ${exists}`)
    
    if (!exists) {
      console.log(`\n   ⚠️  Bucket doesn't exist. Creating it...`)
      await client.makeBucket(BUCKET_NAME, "us-east-1")
      console.log(`   ✅ Bucket created successfully!`)
    }
    
    // Test 2: List objects in bucket
    console.log("\n2. Listing objects in bucket...")
    const stream = client.listObjects(BUCKET_NAME, "", true)
    const objects: any[] = []
    
    for await (const obj of stream) {
      objects.push(obj)
    }
    
    console.log(`   Found ${objects.length} objects`)
    if (objects.length > 0) {
      console.log(`\n   Files in bucket:`)
      objects.forEach((obj) => {
        console.log(`   - ${obj.name} (${obj.size} bytes, ${new Date(obj.lastModified).toLocaleString()})`)
      })
    }
    
    // Test 3: Upload a test file
    console.log("\n3. Testing file upload...")
    const testContent = Buffer.from("Test file content from MinIO connection test")
    const testFileName = `test/connection-test-${Date.now()}.txt`
    
    await client.putObject(BUCKET_NAME, testFileName, testContent, testContent.length, {
      "Content-Type": "text/plain",
    })
    console.log(`   ✅ Test file uploaded: ${testFileName}`)
    
    // Test 4: Download the test file
    console.log("\n4. Testing file download...")
    const downloadStream = await client.getObject(BUCKET_NAME, testFileName)
    const chunks: Buffer[] = []
    
    for await (const chunk of downloadStream) {
      chunks.push(chunk)
    }
    
    const downloadedContent = Buffer.concat(chunks).toString()
    console.log(`   ✅ Test file downloaded successfully`)
    console.log(`   Content: "${downloadedContent}"`)
    
    // Test 5: Delete the test file
    console.log("\n5. Cleaning up test file...")
    await client.removeObject(BUCKET_NAME, testFileName)
    console.log(`   ✅ Test file deleted`)
    
    console.log("\n✅ All MinIO tests passed successfully!\n")
    process.exit(0)
  } catch (error: any) {
    console.error("\n❌ MinIO connection test failed!")
    console.error("\nError details:")
    console.error("  Message:", error.message)
    console.error("  Code:", error.code)
    if (error.stack) {
      console.error("\nStack trace:")
      console.error(error.stack)
    }
    process.exit(1)
  }
}

testMinIO()
