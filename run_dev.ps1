<#
run_dev.ps1

Starts the Django backend (SQLite) and Next.js frontend in separate PowerShell windows for local development.
Usage: from project root run: .\run_dev.ps1

This script will:
- create and activate a venv for backend (if not exists) and install requirements
- run migrations
- start Django dev server on port 8000
- install frontend deps (if needed) and start Next.js dev server on port 3000

#>

param()

function Start-Backend {
    Write-Host "Starting backend (Django) ..."
    Push-Location -Path "./backend"
    if (-not (Test-Path -Path ".venv")) {
        python -m venv .venv
        Write-Host "Created virtualenv .venv"
    }
    $activate = Join-Path -Path (Get-Location) -ChildPath ".venv\Scripts\Activate.ps1"
    $cmd = "& `"$activate`"; pip install -r requirements.txt; python manage.py migrate; python manage.py runserver 0.0.0.0:8000"
    Start-Process powershell -ArgumentList "-NoExit","-Command","$cmd"
    Pop-Location
}

function Start-Frontend {
    Write-Host "Starting frontend (Next.js) ..."
    Push-Location -Path "."
    if (-not (Test-Path -Path "node_modules")) {
        Write-Host "Installing frontend dependencies (npm ci) ..."
        npm ci
    }
    $cmd = "npm run dev"
    Start-Process powershell -ArgumentList "-NoExit","-Command","cd $PWD; $cmd"
    Pop-Location
}

Start-Backend
Start-Frontend

Write-Host "Both processes started. Backend -> http://localhost:8000, Frontend -> http://localhost:3000"
