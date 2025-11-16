# PowerShell script to run database migrations in production

# Step 1: Generate migration files locally
Write-Host "Generating migration files..." -ForegroundColor Cyan
bun run db:generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to generate migrations" -ForegroundColor Red
    exit 1
}

# Step 2: Find the latest migration file
$latestMigration = Get-ChildItem -Path "drizzle" -Filter "*.sql" | Sort-Object Name -Descending | Select-Object -First 1

if (-not $latestMigration) {
    Write-Host "No migration files found" -ForegroundColor Yellow
    exit 0
}

Write-Host "Applying migration: $($latestMigration.Name)" -ForegroundColor Yellow

# Step 3: Execute migration inside the web container
Write-Host "Running migration in container..." -ForegroundColor Cyan
docker exec aicuf-website-web-1 bun run /app/scripts/migrate.ts

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migrations completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Migration failed" -ForegroundColor Red
    exit 1
}
