#!/bin/sh
set -e

echo "🚀 Starting application..."

# Run migrations (external PostgreSQL should already be available)
echo "📦 Running database migrations..."
if [ -f "/app/scripts/migrate.ts" ]; then
  bun run /app/scripts/migrate.ts
  if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully"
  else
    echo "⚠️  Migrations failed, but continuing..."
  fi
else
  echo "⚠️  No migration script found, skipping..."
fi

# Start the Next.js application
echo "🌐 Starting Next.js server..."
exec node server.js
