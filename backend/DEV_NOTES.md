Development notes — local quick start (SQLite)

This file explains how to run the entire project locally in development mode using SQLite for fast debugging.

1. Backend (Django + SQLite)

- From project root:

```powershell
cd "c:\Users\PC0 SkyTex\Desktop\Devvv\ZarRice-Shop-Front\backend"
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

- Admin: http://localhost:8000/admin/
- API root: http://localhost:8000/api/

2. Frontend (Next.js)

- From project root:

```powershell
copy .env.local.example .env.local
# ensure .env.local has NEXT_PUBLIC_API_URL=http://localhost:8000
npm ci
npm run dev
```

- Frontend dev server: http://localhost:3000

3. Convenience script (Windows PowerShell)

- A helper `run_dev.ps1` is available at the repository root to start both backend and frontend in separate PowerShell windows.

From repo root run:

```powershell
.\run_dev.ps1
```

The script will:

- create backend virtualenv if missing
- install backend requirements
- run migrations
- start Django dev server
- install frontend dependencies (if needed) and start Next.js dev server

4. Notes

- Backend defaults to SQLite unless `DATABASE_URL` is provided in `backend/.env`. The Django `settings.py` uses SQLite by default and will switch to `DATABASE_URL` if present.
- Zarinpal payment integration is present. For local testing you can set `ZARINPAL_SANDBOX=1` and either place `ZARINPAL_MERCHANT_ID` in `backend/.env` or create a `Payment Settings` entry in the admin.
- Cart merging (guest -> user) is not implemented yet and should be added for a better UX.

If you want, I can now add an automatic merge on login (merge-cart) or show how to test a full Zarinpal sandbox payment locally. Let me know which you prefer.
