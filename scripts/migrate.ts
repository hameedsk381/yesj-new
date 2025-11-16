import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
  }

  const connection = postgres(process.env.DATABASE_URL, { max: 1 })

  const db = drizzle(connection)

  console.log("⏳ Running migrations...")

  const start = Date.now()

  await migrate(db, { migrationsFolder: "drizzle" })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  await connection.end()
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  
  // Check if error is "table already exists" - this is safe to ignore in production
  const errorMessage = err?.message || String(err)
  if (errorMessage.includes("already exists")) {
    console.log("⚠️  Tables already exist, skipping migration")
    process.exit(0)
  }
  
  process.exit(1)
})
