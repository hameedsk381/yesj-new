#!/bin/sh
set -e

echo "🚀 Starting application..."

# Start the Next.js application
echo "🌐 Starting Next.js server..."
exec node server.js
