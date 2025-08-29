# LinkedIn Sales Automation Tool (MVP) 🔗🤖

A compact prototype for generating outreach campaigns, simulating prospect sequences, and tracking basic campaign metrics. Built as a FastAPI backend and a React + Vite frontend, this repo is intentionally modular and ready for experimentation.

## Quick overview

- Purpose: Explore how NLP-driven templates, sequencing, and lightweight metrics can automate LinkedIn-style outreach.
- Stack: Python (FastAPI) backend, React + Vite frontend, no production DB included (in-memory / stubbed data).
- Status: MVP — many parts are stubbed for speed of prototyping.

## Table of contents

- [What's included](#whats-included)
- [Architecture](#architecture)
- [Quickstart (local)](#quickstart-local)
- [API reference (important endpoints)](#api-reference-important-endpoints)
- [Development notes & todos](#development-notes--todos)
- [Contributing](#contributing)
- [License & credits](#license--credits)

## What's included

- backend/
  - FastAPI app with routes for campaigns, sequences and metrics
  - `services/` with simple NLP, scheduler and metrics helpers (mostly stubbed)
- frontend/
  - Vite + React app with a campaign form, preview, and a small dashboard

## Architecture

```
backend/
  requirements.txt
  app/
    main.py
    routers/
    services/
frontend/
  package.json
  src/
README.md
```

Flow: Frontend -> Backend API -> Stubbed NLP/Sequence -> JSON responses for preview and metrics.

## Quickstart (local)

Requirements
- Python 3.10+ (recommended)
- Node 16+ (or compatible)
- npm

### Backend (Windows PowerShell)

Open PowerShell in the repo root and run:

```powershell
python -m venv backend/.venv
backend/.venv/Scripts/python -m pip install --upgrade pip
backend/.venv/Scripts/pip install -r backend/requirements.txt
cd backend
..\backend\.venv\Scripts\python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Endpoints to check
- Health: http://127.0.0.1:8000/health

### Backend (macOS / Linux)

```bash
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install --upgrade pip
backend/.venv/bin/pip install -r backend/requirements.txt
cd backend
../backend/.venv/bin/python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend (Vite + React)

Open a second terminal in `frontend/` and run:

```bash
npm install
npm run dev
```

Default app URL: http://127.0.0.1:5173

Notes
- The frontend calls the backend directly at `http://127.0.0.1:8000` (see `frontend/src/utils/api.js`). Ensure the backend is running locally or adjust the base URL.

## API reference (important endpoints)

- GET /health
  - Quick health check. Returns `{ "status": "ok" }` when ready.
- POST /api/campaigns/intake
  - Submit a campaign configuration and receive a generated preview with simulated prospects and messages.
- POST /api/campaigns/sequence/start
  - Start a simulated sequence for a campaign (stubbed scheduler).
- GET /api/campaigns/sequence/stats
  - Get aggregated sequence stats.
- GET /api/campaigns/metrics
  - Retrieve metrics used by the dashboard.
- POST /api/campaigns/metrics/mock-reply
  - Emit a mock reply for testing metrics flows.
- POST /api/auth/signup
  - Create a user and return a bearer token.
- POST /api/auth/login
  - Authenticate a user and return a bearer token.
- GET /api/auth/me
  - Return the current user (requires `Authorization: Bearer <token>`).

Tip: Open `backend/app/routers/campaigns.py` and `backend/app/routers/auth.py` to see expected request and response shapes.

## Development notes & todos

Current limitations
- NLP and prospect sourcing are stubbed: see `backend/app/services/nlp.py`.
- Sequencing is simulated: see `backend/app/services/scheduler.py`.
- No database persistence by default — add SQLite/Postgres for real runs.

Suggested next steps
- Integrate a real profile-analysis or enrichment API for sourcing prospects.
- Add persistence (SQLite for quick local dev, Postgres for production).
- Add authentication and role-based access for team workflows.
- Replace stubbed NLP with an LLM or hosted NLP API and add rate limiting.

## Contributing

Small contributions are welcome. Recommended flow:
1. Fork the repo
2. Create a descriptive branch (feature/xxxx)
3. Add tests for backend changes
4. Open a PR with a short description and screenshots if relevant

## License & credits

MIT-style (adjust to your preferred license).

---

Want extras?
- I can add a short example JSON for `POST /api/campaigns/intake`.
- I can add a small developer checklist (pre-commit hooks, linting).

Tell me which you'd like and I'll add them.
