#!/bin/sh
set -e

echo "🚀 Starting application..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL..."
until nc -z postgres 5432 2>/dev/null; do
  echo "  PostgreSQL is unavailable - sleeping"
  sleep 2
done
echo "✅ PostgreSQL is ready!"

# Run migrations
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
