import { db } from "../lib/db";
import { users } from "../lib/db/schema";
import { Storage } from "@google-cloud/storage";
import { count } from "drizzle-orm";

async function test() {
  console.log("--- Connection Test ---");

  // 1. Test MySQL
  try {
    console.log("Testing MySQL connection...");
    const [userCount] = await db.select({ value: count() }).from(users);
    console.log(`[✓] MySQL Connected! User count: ${userCount.value}`);
  } catch (err) {
    console.error(`[✗] MySQL Connection Failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  // 2. Test GCS
  try {
    console.log("\nTesting GCS connection...");
    if (!process.env.GCS_PROJECT_ID || !process.env.GCS_BUCKET_NAME) {
        throw new Error("GCS environment variables missing");
    }

    const storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });

    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    const [exists] = await bucket.exists();
    
    if (exists) {
        console.log(`[✓] GCS Connected! Bucket '${process.env.GCS_BUCKET_NAME}' exists.`);
        
        // Try listing files (optional)
        console.log("Listing first few files...");
        const [files] = await bucket.getFiles({ maxResults: 3 });
        if (files.length > 0) {
            files.forEach(f => console.log(`  - ${f.name}`));
        } else {
            console.log("  (Bucket is empty)");
        }
    } else {
        console.error(`[✗] GCS Connected, but bucket '${process.env.GCS_BUCKET_NAME}' was not found.`);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[✗] GCS Connection Failed: ${errorMessage}`);
    if (errorMessage.includes("PEM")) {
        console.log("TIP: Your private key format might be incorrect. Ensure it starts with '-----BEGIN PRIVATE KEY-----' and you use backslashes for newlines if needed.");
    }
  }

  console.log("\n--- Test Finished ---");
  process.exit(0);
}

test();
