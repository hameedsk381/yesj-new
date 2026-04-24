import { uploadFile } from "../lib/storage"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// Load env variables
dotenv.config()

async function run() {
  const filePath = path.join(process.cwd(), "public", "summer-courses-promo.png")
  const buffer = fs.readFileSync(filePath)
  const destination = "assets/summer-courses-promo.png"
  
  try {
    const url = await uploadFile(buffer, destination, "image/png")
    console.log("Upload successful!")
    console.log("URL:", url)
  } catch (error) {
    console.error("Upload failed:", error)
    process.exit(1)
  }
}

run()
