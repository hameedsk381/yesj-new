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
    // First, let's see what we have
    const existing = await sql`
      SELECT id, noc_file_path FROM nominations WHERE noc_file_path LIKE 'http%'
    `
    
    console.log(`Found ${existing.length} nominations with full URLs:`)
    existing.forEach((row: any) => {
      console.log(`  - ID ${row.id}: ${row.noc_file_path}`)
    })

    // Update all nominations that have full MinIO URLs
    // This regex removes everything up to and including the bucket name
    const result = await sql`
      UPDATE nominations
      SET noc_file_path = regexp_replace(
        noc_file_path,
        '^https?://[^/]+(?::[0-9]+)?/[^/]+/',
        ''
      )
      WHERE noc_file_path LIKE 'http%'
    `

    console.log(`\n✅ Updated ${result.count} nomination records`)
    
    // Verify the changes
    const updated = await sql`
      SELECT id, noc_file_path FROM nominations LIMIT 5
    `
    
    console.log("\nSample updated records:")
    updated.forEach((row: any) => {
      console.log(`  - ID ${row.id}: ${row.noc_file_path}`)
    })
    
    console.log("\nMigration completed successfully!")
    
    await sql.end()
    process.exit(0)
  } catch (error) {
    console.error("❌ Migration failed:", error)
    await sql.end()
    process.exit(1)
  }
}

migrateFilePaths()
