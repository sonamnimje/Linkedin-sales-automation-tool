from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import campaigns
from app.routers import auth as auth_router

app = FastAPI(title="LinkedIn Sales Automation API")

# Allow local dev frontend
app.add_middleware(
    CORSMiddleware,
    # Allow local dev frontends on common vite ports (5173 and 5174)
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(campaigns.router, prefix="/api")
app.include_router(auth_router.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"message": "Backend is running"}


@app.on_event("startup")
def on_startup():
    print("[Backend] FastAPI server started. Health at /health, message at /")

