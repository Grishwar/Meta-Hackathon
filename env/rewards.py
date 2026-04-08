from typing import Dict


def calculate_reward(
    task: Dict,
    action_type: str,
    target: str,
    decisions: Dict[str, str],
    escalated: bool,
    finalized: bool
) -> Dict:
    allowed_permissions = task["allowed_permissions"]
    forbidden_permissions = task["forbidden_permissions"]
    requires_escalation = task.get("requires_escalation", False)

    reward = 0.0
    reason = "Neutral action"

    if action_type == "inspect_user":
        reward = 0.05
        reason = "Inspected user profile"

    elif action_type == "inspect_permissions":
        reward = 0.05
        reason = "Inspected permissions"

    elif action_type == "inspect_policy":
        reward = 0.05
        reason = "Inspected policy rules"

    elif action_type == "revoke_access":
        if target in forbidden_permissions:
            reward = 0.15
            reason = f"Correctly revoked forbidden permission: {target}"
        elif target in allowed_permissions:
            reward = -0.2
            reason = f"Incorrectly revoked allowed permission: {target}"
        else:
            reward = -0.05
            reason = f"Revoked unknown or irrelevant permission: {target}"

    elif action_type == "keep_access":
        if target in allowed_permissions:
            reward = 0.12
            reason = f"Correctly retained allowed permission: {target}"
        elif target in forbidden_permissions:
            reward = -0.2
            reason = f"Incorrectly kept forbidden permission: {target}"
        else:
            reward = -0.05
            reason = f"Kept unknown or irrelevant permission: {target}"

    elif action_type == "escalate_review":
        if requires_escalation:
            reward = 0.15
            reason = "Correctly escalated a sensitive or ambiguous case"
        else:
            reward = -0.05
            reason = "Escalation was unnecessary for this task"

    elif action_type == "finalize_review":
        missing_forbidden = [p for p in forbidden_permissions if decisions.get(p) != "revoke"]
        missing_allowed = [p for p in allowed_permissions if decisions.get(p) != "keep"]

        if missing_forbidden or missing_allowed:
            reward = -0.1
            reason = "Finalized before all key permission decisions were completed"
        elif requires_escalation and not escalated:
            reward = -0.1
            reason = "Finalized without required escalation"
        else:
            reward = 0.1
            reason = "Review finalized after complete policy handling"

    return {
        "value": round(reward, 4),
        "reason": reason
    }