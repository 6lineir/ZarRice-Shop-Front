Backend (Django + DRF) for ZarRice-Shop

This backend is configured to run locally without Docker by default (SQLite). It also includes a `docker-compose.yml` if you later want Postgres+Redis.

Quick local run (venv + sqlite):

1. Open PowerShell and run:

```powershell
cd "c:\Users\PC0 SkyTex\Desktop\Devvv\ZarRice-Shop-Front\backend"
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

2. The admin panel is at `http://localhost:8000/admin/`.
3. API endpoints are at `http://localhost:8000/api/`.

Frontend (Next.js) expects the API base URL in an environment variable `NEXT_PUBLIC_API_URL`. For local development, set it to `http://localhost:8000` in `.env.local` at the repository root:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Notes / Next steps:

- Payment provider integration (Stripe/Zarinpal) not yet added.
- Celery worker and AI job processing are scaffolds only; configure Redis and start a worker for production use.
- Cart merging for guest -> authenticated users is not implemented; consider adding merge logic on login.
