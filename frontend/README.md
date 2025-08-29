# Frontend - LinkedIn Sales Automation Tool

This is a minimal React (Vite) frontend for the LinkedIn Sales Automation project.

Quick start (requires Node.js 18+):

1. cd frontend
2. npm install
3. npm run dev

The frontend expects a backend at http://127.0.0.1:8000. The base URL is configured in `src/utils/api.js`.

Key endpoints used by the UI:
- GET /health
- POST /api/campaigns/intake
- POST /api/campaigns/sequence/start
- GET /api/campaigns/sequence/stats
- GET /api/campaigns/metrics
- POST /api/campaigns/metrics/mock-reply
- POST /api/auth/signup, POST /api/auth/login, GET /api/auth/me

If your backend runs elsewhere, update the `API_BASE` in `src/utils/api.js`.
