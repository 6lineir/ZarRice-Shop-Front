# Running the entire project with Docker (frontend + backend + Postgres + Redis)

This repository includes a `docker-compose.yml` at the project root that builds and runs the Next.js frontend and Django backend together, plus Postgres and Redis.

Prereqs: Docker & Docker Compose installed on the server.

1. Copy env templates and configure secrets

On the host, create needed env files:

```powershell
# in repo root
copy .env.local.example .env.local
copy backend/.env.example backend/.env
# Edit backend/.env and set SECRET_KEY and ZARINPAL_MERCHANT_ID etc.
```

Add the following variables to `backend/.env` (example):

```
DEBUG=0
SECRET_KEY=replace-with-a-secure-secret
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 your-server-ip
DATABASE_URL=postgres://postgres:postgres@db:5432/zar_rice
REDIS_URL=redis://redis:6379/0
ZARINPAL_MERCHANT_ID=your_merchant_id_here
ZARINPAL_SANDBOX=1
```

2. Build and start everything

```powershell
docker compose up --build -d
```

3. Run migrations and create superuser (only once)

```powershell
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

4. Access services

- Frontend: http://<server-ip>:3000
- Backend API: http://<server-ip>:8000/api/
- Admin panel: http://<server-ip>:8000/admin/

Notes and next steps:

- In `backend` admin you can set `PaymentSettings` and enable Zarinpal and set `merchant_id` (if you prefer storing secrets in DB). For security, keep secrets in environment variables on the server.
- Zarinpal sandbox mode is supported. For production set `ZARINPAL_SANDBOX=0` and supply the real `ZARINPAL_MERCHANT_ID`.
- You may want to configure HTTPS (reverse proxy like Nginx) in front of containers for production.
