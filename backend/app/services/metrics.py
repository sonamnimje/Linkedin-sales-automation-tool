from typing import Dict


_metrics: Dict[str, int] = {
    "connections_sent": 0,
    "followups_sent": 0,
    "replies_received": 0,
}


def record_send(kind: str) -> None:
    if kind == "connection":
        _metrics["connections_sent"] += 1
    elif kind == "follow_up":
        _metrics["followups_sent"] += 1


def record_reply() -> None:
    _metrics["replies_received"] += 1


def get_metrics() -> Dict[str, int]:
    return dict(_metrics)


