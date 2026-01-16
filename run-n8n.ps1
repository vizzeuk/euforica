# Script para ejecutar n8n con túnel habilitado
# Uso: .\run-n8n.ps1

Write-Host "🚀 Iniciando n8n con túnel público..." -ForegroundColor Cyan
Write-Host "⏳ La primera ejecución puede tardar 2-3 minutos descargando..." -ForegroundColor Yellow
Write-Host ""

# Ejecutar n8n desde npx con configuración de environment
$env:N8N_HOST="localhost"
$env:N8N_PORT="5678"
$env:N8N_PROTOCOL="http"

# Comando final
npx --yes --package=n8n@latest -- n8n start --tunnel

Write-Host ""
Write-Host "❌ n8n se detuvo" -ForegroundColor Red
