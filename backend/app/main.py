from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.routers import campaigns
from app.routers import auth as auth_router

app = FastAPI(title="LinkedIn Sales Automation API")

# Allow local dev frontend
# Allow local dev and optionally a production origin from env
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

production_origin = os.getenv("FRONTEND_ORIGIN")
if production_origin:
    allowed_origins.append(production_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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

