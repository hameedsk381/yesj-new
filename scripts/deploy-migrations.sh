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

# Step 3: Apply migration to production database
cat "$LATEST_MIGRATION" | docker exec -i aicuf-postgres psql -U aicuf -d aicuf

echo "✅ Migrations completed successfully!"
