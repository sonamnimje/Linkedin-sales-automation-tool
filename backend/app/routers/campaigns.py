from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from app.services.nlp import analyze_profile, generate_messages
from app.services.scheduler import run_outreach_sequence, get_sequence_stats
from app.services.metrics import get_metrics, record_reply
import asyncio

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


class CampaignIn(BaseModel):
    product_service: str
    target_industry: str
    ideal_job_roles: List[str]
    company_size: str
    region: str
    outreach_goal: str
    brand_voice: str
    optional_triggers: Optional[List[str]] = None


class Prospect(BaseModel):
    name: str
    title: str
    company: str
    context_note: Optional[str] = None


class Message(BaseModel):
    connection: str
    follow_up: str


class CampaignOut(BaseModel):
    prospects_found: int
    best_match: Prospect
    message: Message


@router.post("/intake", response_model=CampaignOut)
async def intake(campaign: CampaignIn):
    # Naive best match consistent with example
    best = Prospect(
        name="Anjali Mehta",
        title="HR Manager",
        company="HirePulse",
        context_note="recent post on hybrid hiring",
    )

    # Use placeholder NLP to influence tone/keywords
    insights = analyze_profile(
        f"{best.title} talking about hybrid hiring and onboarding in {campaign.target_industry}"
    )
    insight_keyword = (insights.get("keywords") or ["hiring"])[0]
    generated = generate_messages(
        first_name=best.name.split(" ")[0],
        brand_voice=campaign.brand_voice,
        product_service=campaign.product_service,
        insight_note=insight_keyword,
    )
    msg = Message(connection=generated["connection"], follow_up=generated["follow_up"])
    return CampaignOut(prospects_found=72, best_match=best, message=msg)


class SequenceStep(BaseModel):
    delay_minutes: float
    message: str


class SequenceRequest(BaseModel):
    prospect: Prospect
    steps: List[SequenceStep]


@router.post("/sequence/start")
async def start_sequence(req: SequenceRequest):
    # Fire-and-forget background sequence
    asyncio.create_task(
        run_outreach_sequence(
            prospect=req.prospect.model_dump(),
            steps=[s.model_dump() for s in req.steps],
        )
    )
    return {"status": "scheduled", "steps": len(req.steps)}


@router.get("/sequence/stats")
async def sequence_stats():
    return get_sequence_stats()


@router.get("/metrics")
async def metrics():
    return get_metrics()


@router.post("/metrics/mock-reply")
async def mock_reply():
    record_reply()
    return {"status": "ok"}


