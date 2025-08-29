from typing import Dict, List


def analyze_profile(profile_text: str) -> Dict[str, str | List[str]]:
    """Very simple placeholder NLP analysis.
    Extracts naive keywords and sentiment hints from the provided profile text.
    """
    lower = (profile_text or "").lower()
    keywords: List[str] = []
    for word in [
        "hiring",
        "onboarding",
        "recruiting",
        "talent",
        "growth",
        "engineering",
        "sales",
        "marketing",
        "ai",
        "automation",
        "hr",
    ]:
        if word in lower:
            keywords.append(word)

    sentiment = "neutral"
    if any(k in lower for k in ["love", "excited", "thrilled", "proud"]):
        sentiment = "positive"
    if any(k in lower for k in ["frustrated", "challenging", "struggling"]):
        sentiment = "concerned"

    return {"keywords": keywords or ["hr", "onboarding"], "sentiment": sentiment}


def generate_messages(
    first_name: str,
    brand_voice: str,
    product_service: str,
    insight_note: str,
) -> Dict[str, str]:
    """Return connection and follow-up messages adapted to a simple brand voice."""
    tone = (brand_voice or "friendly").strip().lower()
    greeting = {
        "formal": f"Hello {first_name}",
        "enthusiastic": f"Hey {first_name}!",
        "friendly": f"Hi {first_name}",
    }.get(tone, f"Hi {first_name}")

    connector = {
        "formal": "I came across your profile and",
        "enthusiastic": "I just saw your profile and",
        "friendly": "I noticed your profile and",
    }.get(tone, "I noticed your profile and")

    close = {
        "formal": "Would you be open to a brief discussion?",
        "enthusiastic": "Open to a super quick chat?",
        "friendly": "Open to a quick chat?",
    }.get(tone, "Open to a quick chat?")

    connection = (
        f"{greeting}, liked your note on {insight_note}. {connector} thought {product_service} "
        f"could help with this. {close}"
    )

    follow_up = {
        "formal": "Following up in case this aligns with your priorities. Happy to share a brief overview.",
        "enthusiastic": "Bumping this—can share a 2-min loom if helpful!",
        "friendly": "Just circling back—happy to share a 2-min loom if useful.",
    }.get(tone, "Just circling back—happy to share a 2-min loom if useful.")

    return {"connection": connection, "follow_up": follow_up}


