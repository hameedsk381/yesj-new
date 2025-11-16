#!/bin/bash
# Run database migrations in production

set -e

# Step 1: Generate migration files locally
echo "Generating migration files..."
bun run db:generate

# Step 2: Find the latest migration file
LATEST_MIGRATION=$(ls -t drizzle/*.sql 2>/dev/null | head -n 1)

if [ -z "$LATEST_MIGRATION" ]; then
    echo "No migration files found"
    exit 0
fi

echo "Applying migration: $(basename $LATEST_MIGRATION)"

# Step 3: Execute migration inside the web container
echo "Running migration in container..."
docker exec aicuf-website-web-1 bun run /app/scripts/migrate.ts

echo "✅ Migrations completed successfully!"
