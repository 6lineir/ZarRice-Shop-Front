# Setup and Run Instructions for ZarRice-Shop

## Prerequisites

You need to install Python 3.10+ on your system. Download from https://www.python.org/downloads/ and make sure to check "Add Python to PATH" during installation.

After installing Python, verify it's in PATH:

```powershell
python --version
pip --version
```

## Local Development Setup (SQLite)

Follow these steps in order:

### 1. Backend Setup

Open PowerShell and run:

```powershell
cd "c:\Users\PC0 SkyTex\Desktop\Devvv\ZarRice-Shop-Front\backend"

# Create virtual environment
python -m venv .venv

# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser

# Start Django development server (keep this terminal open)
python manage.py runserver 0.0.0.0:8000
```

Once this is done, the backend will be running at:

- **API Root**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

### 2. Frontend Setup

Open a **NEW PowerShell window** (keep the backend running in the first one) and run:

```powershell
cd "c:\Users\PC0 SkyTex\Desktop\Devvv\ZarRice-Shop-Front"

# Copy env template
copy .env.local.example .env.local

# Install dependencies
npm ci

# Start Next.js development server
npm run dev
```

Once this is done, the frontend will be running at:

- **Frontend**: http://localhost:3000

### 3. Testing the Integration

1. **Homepage**: http://localhost:3000
2. **Products page**: http://localhost:3000/products
3. **Register**: http://localhost:3000/register (create a test account)
4. **Login**: http://localhost:3000/login (with your test account)
5. **Admin panel**: http://localhost:8000/admin (use superuser credentials)

### 4. Configure Zarinpal (Payment Gateway)

In the admin panel (http://localhost:8000/admin):

1. Go to "Payment Settings"
2. Click "Add Payment Settings"
3. Fill in:
   - Provider: zarinpal
   - Merchant ID: (leave empty for local testing, or use a test merchant ID)
   - Sandbox: ✓ (checked)
   - Enabled: ✓ (checked)
4. Save

### 5. Test Payment Flow (Optional)

1. Add products to cart
2. Go to checkout: http://localhost:3000/checkout
3. Click "Pay"
4. You'll be redirected to Zarinpal test page

## Common Issues

### "Python not found"

- Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation
- Restart PowerShell after installing

### Virtual environment won't activate

- Make sure you're in the `backend` directory
- Try: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Then try activating again: `.\.venv\Scripts\Activate.ps1`

### npm: command not found

- Install Node.js from https://nodejs.org/ (LTS recommended)
- Restart PowerShell after installing

### Port 8000 or 3000 already in use

- Change the port: `python manage.py runserver 0.0.0.0:8001`
- Or kill the process using the port

## Database

- Local development uses **SQLite** (file: `backend/db.sqlite3`)
- No additional setup needed
- For production, use Postgres (see docker-compose.yml)

## Stopping Services

- **Backend**: Press Ctrl+C in backend PowerShell window
- **Frontend**: Press Ctrl+C in frontend PowerShell window

## Next Steps

- Configure Zarinpal merchant ID for payment testing
- Add products via admin panel
- Test cart, checkout, and payment flow
