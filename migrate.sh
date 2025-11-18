#!/bin/sh
# Migration script for production deployment
# Run this after deployment to apply database schema changes

echo "🔄 Running database migrations..."

# Run Drizzle migrations
bun run drizzle-kit push

echo "✅ Database migrations complete!"
