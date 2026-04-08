from typing import Optional, List, Dict, Any, Literal
from pydantic import BaseModel


class Action(BaseModel):
    action_type: Literal[
        "inspect_user",
        "inspect_permissions",
        "inspect_policy",
        "revoke_access",
        "keep_access",
        "escalate_review",
        "finalize_review"
    ]
    target: Optional[str] = None
    reason: Optional[str] = None


class Reward(BaseModel):
    value: float
    reason: str


class Observation(BaseModel):
    task_id: str
    title: str
    difficulty: str

    visible_user_profile: Optional[Dict[str, Any]] = None
    visible_permissions: List[Dict[str, Any]] = []
    visible_policy_rules: List[str] = []

    actions_taken: List[str] = []
    decisions: Dict[str, str] = {}

    escalated: bool = False
    finalized: bool = False

    step_count: int = 0
    remaining_steps: int = 0

    notes: List[str] = []


class StepResponse(BaseModel):
    observation: Observation
    reward: Reward
    done: bool
    info: Dict[str, Any]