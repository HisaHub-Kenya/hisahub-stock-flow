# PowerShell wrapper to run the Puppeteer seed script
# Usage: .\scripts\seed-auth.ps1 -PreviewUrl http://localhost:4173
param(
  [string]$PreviewUrl = 'http://localhost:4173'
)

$env:PREVIEW_URL = $PreviewUrl
Write-Host "Running seed script against $PreviewUrl"
node .\scripts\seed-auth.js
if ($LASTEXITCODE -ne 0) {
  Write-Error "Seed script failed with exit code $LASTEXITCODE"
  exit $LASTEXITCODE
}
Write-Host "Seed completed"
