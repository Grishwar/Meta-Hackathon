from typing import Dict


def grade_task(task: Dict, decisions: Dict[str, str], escalated: bool, finalized: bool) -> Dict:
    allowed_permissions = task["allowed_permissions"]
    forbidden_permissions = task["forbidden_permissions"]
    requires_escalation = task.get("requires_escalation", False)

    earned = 0.0
    possible = 0.0

    # Forbidden permission revocations
    if forbidden_permissions:
        possible += 0.5
        revoked_correctly = sum(
            1 for perm in forbidden_permissions if decisions.get(perm) == "revoke"
        )
        earned += 0.5 * (revoked_correctly / len(forbidden_permissions))

    # Allowed permission retention
    if allowed_permissions:
        possible += 0.3
        kept_correctly = sum(
            1 for perm in allowed_permissions if decisions.get(perm) == "keep"
        )
        earned += 0.3 * (kept_correctly / len(allowed_permissions))

    # Escalation correctness (only if required)
    if requires_escalation:
        possible += 0.1
        if escalated:
            earned += 0.1

    # Finalization
    possible += 0.1
    if finalized:
        earned += 0.1

    # Normalize score to 1.0 for task-specific applicable dimensions
    if possible > 0:
        score = earned / possible
    else:
        score = 0.0

    # Slight penalty for unnecessary escalation in non-escalation tasks
    if not requires_escalation and escalated:
        score -= 0.05

    score = max(0.0, min(1.0, round(score, 4)))

    return {
        "task_id": task["task_id"],
        "final_score": score,
        "allowed_permissions": allowed_permissions,
        "forbidden_permissions": forbidden_permissions,
        "kept": [k for k, v in decisions.items() if v == "keep"],
        "revoked": [k for k, v in decisions.items() if v == "revoke"],
        "escalated": escalated,
        "finalized": finalized
    }