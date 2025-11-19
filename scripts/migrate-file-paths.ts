/**
 * Migration script to update existing nomination file paths from full URLs to relative paths
 * Run this with: bun run scripts/migrate-file-paths.ts
 */

import postgres from "postgres"

async function migrateFilePaths() {
  console.log("Starting file path migration...")

  const sql = postgres(process.env.DATABASE_URL!, {
    max: 1,
  })

  try {
    // Update all nominations that have full MinIO URLs
    const result = await sql`
      UPDATE nominations
      SET noc_file_path = regexp_replace(
        noc_file_path,
        '^https?://[^/]+/[^/]+/',
        ''
      )
      WHERE noc_file_path LIKE 'http%'
    `

    console.log(`✅ Updated ${result.count} nomination records`)
    console.log("Migration completed successfully!")
    
    await sql.end()
    process.exit(0)
  } catch (error) {
    console.error("❌ Migration failed:", error)
    await sql.end()
    process.exit(1)
  }
}

migrateFilePaths()
