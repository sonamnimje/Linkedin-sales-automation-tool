import asyncio
from typing import Dict, List
from app.services.metrics import record_send


scheduled_events: List[Dict] = []


async def run_outreach_sequence(prospect: Dict, steps: List[Dict]) -> None:
    """Simulate human-like delays between outreach steps and record events."""
    for index, step in enumerate(steps, start=1):
        delay_minutes = float(step.get("delay_minutes", 0))
        message_text = str(step.get("message", "")).strip()
        # Wait before sending this step to simulate human delay
        await asyncio.sleep(max(delay_minutes, 0) * 60)
        event = {
            "prospect": prospect,
            "step_index": index,
            "delay_minutes": delay_minutes,
            "message": message_text,
            "status": "sent",
        }
        scheduled_events.append(event)
        # Naively classify the first message as connection, others as follow-ups
        record_send("connection" if index == 1 else "follow_up")


def get_sequence_stats() -> Dict[str, int]:
    total_sent = len(scheduled_events)
    return {"messages_sent": total_sent}


