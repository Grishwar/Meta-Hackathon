from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import Dict, Any, Optional
from copy import deepcopy

app = FastAPI(
    title="OpenPolicyEnv",
    description="A benchmark environment for enterprise access review, least-privilege enforcement, and compliance escalation.",
    version="1.1.0"
)

# =========================
# DATA MODELS
# =========================

class Action(BaseModel):
    action_type: str
    permission: Optional[str] = None


class ResetRequest(BaseModel):
    task_id: Optional[str] = None


# =========================
# TASK DEFINITIONS
# =========================

TASKS: Dict[str, Dict[str, Any]] = {
    "terminated_access_cleanup": {
        "user": {
            "name": "Alex Carter",
            "role": "Sales Manager",
            "employment_status": "terminated",
            "department": "Sales"
        },
        "permissions": [
            "slack_access",
            "email_access",
            "crm_view"
        ],
        "policy": {
            "allowed_permissions": [],
            "forbidden_permissions": [
                "slack_access",
                "email_access",
                "crm_view"
            ],
            "requires_escalation": False
        }
    },
    "contractor_least_privilege": {
        "user": {
            "name": "Priya Nair",
            "role": "Contractor",
            "employment_status": "active",
            "department": "Engineering"
        },
        "permissions": [
            "wiki_access",
            "prod_db_read",
            "finance_dashboard_view"
        ],
        "policy": {
            "allowed_permissions": [
                "wiki_access"
            ],
            "forbidden_permissions": [
                "prod_db_read",
                "finance_dashboard_view"
            ],
            "requires_escalation": False
        }
    },
    "privilege_drift_sensitive_escalation": {
        "user": {
            "name": "Jordan Lee",
            "role": "HR Specialist",
            "employment_status": "active",
            "department": "HR"
        },
        "permissions": [
            "hr_records_edit",
            "finance_exports"
        ],
        "policy": {
            "allowed_permissions": [
                "hr_records_edit"
            ],
            "forbidden_permissions": [
                "finance_exports"
            ],
            "requires_escalation": True
        }
    },
    "executive_temp_access_expiry_audit": {
        "user": {
            "name": "Maya Singh",
            "role": "Executive",
            "employment_status": "active",
            "department": "Strategy"
        },
        "permissions": [
            "board_docs_read",
            "strategy_wiki_edit",
            "mna_data_room"
        ],
        "policy": {
            "allowed_permissions": [
                "board_docs_read",
                "strategy_wiki_edit"
            ],
            "forbidden_permissions": [
                "mna_data_room"
            ],
            "requires_escalation": False
        }
    }
}

ACTIVE_SESSIONS: Dict[str, Dict[str, Any]] = {}


# =========================
# HELPERS
# =========================

def create_initial_state(task_id: str) -> Dict[str, Any]:
    task = TASKS[task_id]
    return {
        "task_id": task_id,
        "user": deepcopy(task["user"]),
        "granted_permissions": deepcopy(task["permissions"]),
        "policy": deepcopy(task["policy"]),
        "inspected_user": False,
        "inspected_permissions": False,
        "inspected_policies": False,
        "revoked_permissions": [],
        "escalated": False,
        "finalized": False
    }


def compute_score(state: Dict[str, Any]) -> float:
    policy = state["policy"]
    allowed = set(policy["allowed_permissions"])
    forbidden = set(policy["forbidden_permissions"])
    current = set(state["granted_permissions"])
    revoked = set(state["revoked_permissions"])

    score = 0.0

    # Inspection bonuses
    if state["inspected_user"]:
        score += 0.05
    if state["inspected_permissions"]:
        score += 0.05
    if state["inspected_policies"]:
        score += 0.10

    # Correct permission handling
    correct_kept = allowed.intersection(current)
    correct_revoked = forbidden.intersection(revoked)
    total_expected = len(allowed) + len(forbidden)

    if total_expected > 0:
        score += 0.60 * ((len(correct_kept) + len(correct_revoked)) / total_expected)

    # Escalation handling
    if policy["requires_escalation"]:
        if state["escalated"]:
            score += 0.10
    else:
        if not state["escalated"]:
            score += 0.10

    # Finalization bonus
    if state["finalized"]:
        score += 0.10

    return round(min(score, 1.0), 4)


def get_breakdown(state: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "task_id": state["task_id"],
        "final_score": compute_score(state),
        "allowed_permissions": state["policy"]["allowed_permissions"],
        "forbidden_permissions": state["policy"]["forbidden_permissions"],
        "kept": state["granted_permissions"],
        "revoked": state["revoked_permissions"],
        "escalated": state["escalated"],
        "finalized": state["finalized"]
    }


# =========================
# ROUTES
# =========================

@app.get("/")
def root():
    return {
        "name": "OpenPolicyEnv",
        "status": "ok",
        "message": "OpenPolicyEnv is running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/tasks")
def list_tasks():
    return {"tasks": list(TASKS.keys())}


# FINAL RESET ENDPOINT (accepts query param, JSON body, or empty POST)
@app.post("/reset")
def reset(
    request: Optional[ResetRequest] = Body(default=None),
    task_id: Optional[str] = None
):
    # Accept:
    # 1) POST /reset?task_id=...
    # 2) POST /reset with JSON body {"task_id":"..."}
    # 3) POST /reset with empty body (default first task for checker compatibility)
    final_task_id = task_id or (request.task_id if request else None) or list(TASKS.keys())[0]

    if final_task_id not in TASKS:
        raise HTTPException(status_code=404, detail=f"Unknown task_id: {final_task_id}")

    state = create_initial_state(final_task_id)
    ACTIVE_SESSIONS["current"] = {
        "task_id": final_task_id,
        "state": state,
        "step_count": 0,
        "done": False
    }

    return {
        "message": "Environment reset successful",
        "task_id": final_task_id,
        "state": state
    }


@app.get("/state")
def state():
    if "current" not in ACTIVE_SESSIONS:
        raise HTTPException(status_code=400, detail="No active session. Call /reset first.")

    session = ACTIVE_SESSIONS["current"]
    return {
        "task_id": session["task_id"],
        "step_count": session["step_count"],
        "done": session["done"],
        "state": session["state"],
        "score": compute_score(session["state"]),
        "breakdown": get_breakdown(session["state"])
    }


@app.post("/step")
def step(action: Action):
    if "current" not in ACTIVE_SESSIONS:
        raise HTTPException(status_code=400, detail="No active session. Call /reset first.")

    session = ACTIVE_SESSIONS["current"]

    if session["done"]:
        return {
            "observation": "Episode already completed.",
            "reward": 0.0,
            "done": True,
            "score": compute_score(session["state"]),
            "breakdown": get_breakdown(session["state"])
        }

    state = session["state"]
    reward = 0.0
    observation = ""

    if action.action_type == "inspect_user":
        state["inspected_user"] = True
        reward = 0.05
        observation = "User details inspected."

    elif action.action_type == "inspect_permissions":
        state["inspected_permissions"] = True
        reward = 0.05
        observation = "Permissions inspected."

    elif action.action_type in ["inspect_policies", "inspect_policy_rules"]:
        state["inspected_policies"] = True
        reward = 0.10
        observation = "Policy rules inspected."

    elif action.action_type == "revoke_access":
        if not action.permission:
            raise HTTPException(status_code=400, detail="permission is required for revoke_access")

        if action.permission in state["granted_permissions"]:
            state["granted_permissions"].remove(action.permission)
            if action.permission not in state["revoked_permissions"]:
                state["revoked_permissions"].append(action.permission)
            reward = 0.10
            observation = f"Permission '{action.permission}' revoked."
        else:
            observation = f"Permission '{action.permission}' not found."
            reward = 0.0

    elif action.action_type == "escalate_case":
        state["escalated"] = True
        reward = 0.10
        observation = "Case escalated."

    elif action.action_type == "finalize":
        state["finalized"] = True
        reward = 0.10
        observation = "Review finalized."
        session["done"] = True

    else:
        raise HTTPException(status_code=422, detail=f"Unknown action_type: {action.action_type}")

    session["step_count"] += 1

    return {
        "observation": observation,
        "reward": reward,
        "done": session["done"],
        "score": compute_score(state),
        "breakdown": get_breakdown(state)
    }