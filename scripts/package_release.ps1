$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$releaseRoot = Join-Path $root "release"
$dist = Join-Path $releaseRoot "touhou_spell_futsal"
$zip = Join-Path $releaseRoot "touhou_spell_futsal.zip"

if (Test-Path -LiteralPath $dist) {
  Remove-Item -LiteralPath $dist -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $dist | Out-Null

Copy-Item -LiteralPath (Join-Path $root "index.html") -Destination $dist
if (Test-Path -LiteralPath (Join-Path $root "favicon.ico")) {
  Copy-Item -LiteralPath (Join-Path $root "favicon.ico") -Destination $dist
}
Copy-Item -LiteralPath (Join-Path $root "README.md") -Destination $dist
Copy-Item -LiteralPath (Join-Path $root "src") -Destination $dist -Recurse
Copy-Item -LiteralPath (Join-Path $root "assets") -Destination $dist -Recurse

$startBat = @'
@echo off
cd /d "%~dp0"
start "" "index.html"
'@
Set-Content -LiteralPath (Join-Path $dist "start_game.bat") -Value $startBat -Encoding ASCII

if (Test-Path -LiteralPath $zip) {
  Remove-Item -LiteralPath $zip -Force
}
Compress-Archive -LiteralPath $dist -DestinationPath $zip -Force

Write-Host "Release folder: $dist"
Write-Host "Release zip: $zip"
