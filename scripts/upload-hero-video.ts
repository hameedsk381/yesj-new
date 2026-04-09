import { Storage } from "@google-cloud/storage";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || "yesj-uploads";

async function uploadVideo() {
  const filePath = "Outreach Final.mp4";
  if (!fs.existsSync(filePath)) {
    console.error("Video file not found!");
    process.exit(1);
  }

  console.log("Starting upload to GCS...");
  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    credentials: {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
  });

  const bucket = storage.bucket(BUCKET_NAME);
  const destination = "website/hero-video.mp4";
  
  await bucket.upload(filePath, {
    destination: destination,
    metadata: {
      contentType: "video/mp4",
    },
  });

  console.log(`Upload successful! URL: https://storage.googleapis.com/${BUCKET_NAME}/${destination}`);
  process.exit(0);
}

uploadVideo().catch(console.error);
