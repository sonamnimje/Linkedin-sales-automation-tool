from typing import List, Optional
from pydantic import BaseModel

class Campaign(BaseModel):
    id: int
    name: str
    product: str
    target_role: str
    industry: str
    goals: Optional[str]

class Prospect(BaseModel):
    id: int
    name: str
    title: str
    company: str
    industry: str
    profile_url: str
    campaign_id: int

class SequenceStep(BaseModel):
    id: int
    campaign_id: int
    step_type: str  # e.g., 'connect', 'follow-up'
    message: Optional[str]
    order: int

class KPI(BaseModel):
    campaign_id: int
    connections: int
    replies: int
    roi: float
