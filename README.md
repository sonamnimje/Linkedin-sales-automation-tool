LinkedIn Sales Automation Tool (MVP)

Quickstart

Backend (FastAPI)
- Open a terminal in `LinkedIn/`.
- Create venv and install dependencies:
  - Windows PowerShell:
    - `python -m venv backend/.venv`
    - `backend/.venv/Scripts/python -m pip install --upgrade pip`
    - `backend/.venv/Scripts/pip install -r backend/requirements.txt`
- Run the API:
  - From `LinkedIn/backend/` run:
    - `../backend/.venv/Scripts/python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`
- Health check: `http://127.0.0.1:8000/health`
- Intake endpoint: `POST http://127.0.0.1:8000/api/campaigns/intake`

Frontend (React + Vite)
- Open a second terminal in `LinkedIn/frontend/`.
- Install deps: `npm install`
- Start dev server: `npm run dev`
- App URL: `http://127.0.0.1:5173`

Frontend features
- Home: shows backend health from `/health`.
- Campaigns: form posts to `POST /api/campaigns/intake` and renders response.
- Sequence: schedules steps via `POST /api/campaigns/sequence/start`, view stats via `GET /api/campaigns/sequence/stats`.
- Metrics: displays `GET /api/campaigns/metrics` and can trigger `POST /api/campaigns/metrics/mock-reply`.

Dev proxy
- Vite is configured to proxy `/health` and `/api/**` to the FastAPI server at `http://127.0.0.1:8000`.

Test Flow
1) Start backend (ensure health returns `{ "status": "ok" }`).
2) Start frontend and open the app URL.
3) Fill the Outreach Setup Form (e.g., Product: HR SaaS; Industry: SaaS; Roles: Head of HR, HR Manager; Size: 50-200; Region: India; Goal: Book a call; Voice: Friendly).
4) Click Generate Preview. You should see a stubbed result with prospects count, best match, and sample messages.

Notes
- CORS is enabled for `http://localhost:5173` and `http://127.0.0.1:5173`.
- NLP and sequencing are stubbed; see `backend/app/services/nlp.py`.
- Next steps: integrate real profile analysis, scraping/API, scheduling, and a response dashboard.
