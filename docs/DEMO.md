Demo Walkthrough (3–5 minutes)

Setup
- Terminal 1: Backend
  - cd backend
  - ../backend/.venv/Scripts/python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
- Terminal 2: Frontend
  - cd frontend
  - npm run dev

Flow
1) Health check
   - Open http://127.0.0.1:8000/health
2) Intake
   - Open http://127.0.0.1:5173
   - Fill: Product "HR SaaS", Industry "SaaS", Roles "Head of HR, HR Manager", Size "50-200", Region "India", Goal "Book a call", Voice "Friendly"
   - Click Generate Preview → Show prospects count, best match, GPT-style messages
3) Personalization
   - Change Brand Voice (Formal/Enthusiastic) and re-generate → messages change
4) Sequence
   - Click Start 2-step Sequence → scheduled
   - Click Refresh Stats → Messages Sent increases after ~1–2s
5) Metrics
   - Click Refresh Metrics → Shows connections/follow-ups
   - Click Mock Reply → Refresh Metrics → Replies increases

Close
- Summarize: Context intake → NLP insights → Personalized messages → Sequenced outreach → Metrics
- Next: real LinkedIn data, richer NLP, CRM sync, A/B tests


