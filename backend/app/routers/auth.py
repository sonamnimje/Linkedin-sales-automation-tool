from typing import Dict, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr


router = APIRouter(prefix="/auth", tags=["auth"])


# In-memory user store for demo purposes only
_users_by_email: Dict[str, Dict[str, str]] = {}


class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    token: str
    email: EmailStr
    name: Optional[str] = None


def _issue_token(email: str) -> str:
    # For demo only: return email as token. Replace with JWT in real app.
    return f"token:{email}"


def _get_email_from_token(token: str) -> Optional[str]:
    if token.startswith("token:"):
        return token.split(":", 1)[1]
    return None


def get_current_user(authorization: Optional[str] = None):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=401, detail="Invalid Authorization header")
    email = _get_email_from_token(token)
    if not email or email not in _users_by_email:
        raise HTTPException(status_code=401, detail="Invalid token")
    return _users_by_email[email]


@router.post("/signup", response_model=AuthResponse)
def signup(payload: SignupRequest):
    if payload.email in _users_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    _users_by_email[payload.email] = {
        "email": str(payload.email),
        "password": payload.password,  # DO NOT store plaintext in real apps
        "name": payload.name or "",
    }
    token = _issue_token(str(payload.email))
    return AuthResponse(token=token, email=payload.email, name=payload.name)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    user = _users_by_email.get(str(payload.email))
    if not user or user.get("password") != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = _issue_token(str(payload.email))
    return AuthResponse(token=token, email=payload.email, name=user.get("name") or None)


class MeResponse(BaseModel):
    email: EmailStr
    name: Optional[str] = None


@router.get("/me", response_model=MeResponse)
def me(user=Depends(get_current_user)):
    return MeResponse(email=user["email"], name=user.get("name") or None)


