from typing import Optional, Dict, Any

from env.models import Observation
from env.tasks import TASKS
from env.graders import grade_task
from env.rewards import calculate_reward


class OpenPolicyEnvironment:
    def __init__(self):
        self.current_task: Optional[Dict[str, Any]] = None
        self.current_task_id: Optional[str] = None
        self.visible_user_profile = None
        self.visible_permissions = []
        self.visible_policy_rules = []
        self.actions_taken = []
        self.decisions = {}
        self.escalated = False
        self.finalized = False
        self.step_count = 0

    def reset(self, task_id: str) -> Observation:
        if task_id not in TASKS:
            raise ValueError(f"Unknown task_id: {task_id}")

        self.current_task = TASKS[task_id]
        self.current_task_id = task_id
        self.visible_user_profile = None
        self.visible_permissions = []
        self.visible_policy_rules = []
        self.actions_taken = []
        self.decisions = {}
        self.escalated = False
        self.finalized = False
        self.step_count = 0

        return self._build_observation()

    def step(self, action_type: str, target: Optional[str] = None, reason: Optional[str] = None):
        if not self.current_task:
            raise ValueError("Environment not initialized. Call reset(task_id) first.")

        if self.finalized:
            return {
                "observation": self._build_observation(),
                "reward": {"value": 0.0, "reason": "Episode already finalized"},
                "done": True,
                "info": {"message": "Episode already completed"}
            }

        self.step_count += 1

        # Process action
        if action_type == "inspect_user":
            self.visible_user_profile = self.current_task["user_profile"]
            self.actions_taken.append("inspect_user")

        elif action_type == "inspect_permissions":
            self.visible_permissions = self.current_task["permissions"]
            self.actions_taken.append("inspect_permissions")

        elif action_type == "inspect_policy":
            self.visible_policy_rules = self.current_task["policy_rules"]
            self.actions_taken.append("inspect_policy")

        elif action_type == "revoke_access":
            if target:
                self.decisions[target] = "revoke"
                self.actions_taken.append(f"revoke_access({target})")
            else:
                self.actions_taken.append("revoke_access(None)")

        elif action_type == "keep_access":
            if target:
                self.decisions[target] = "keep"
                self.actions_taken.append(f"keep_access({target})")
            else:
                self.actions_taken.append("keep_access(None)")

        elif action_type == "escalate_review":
            self.escalated = True
            if reason:
                self.actions_taken.append(f"escalate_review({reason})")
            else:
                self.actions_taken.append("escalate_review")

        elif action_type == "finalize_review":
            self.finalized = True
            self.actions_taken.append("finalize_review")

        reward = calculate_reward(
            task=self.current_task,
            action_type=action_type,
            target=target,
            decisions=self.decisions,
            escalated=self.escalated,
            finalized=self.finalized
        )

        done = self.finalized or self.step_count >= self.current_task["max_steps"]

        info = {"message": "Step processed"}

        if done:
            self.finalized = True
            breakdown = grade_task(
                task=self.current_task,
                decisions=self.decisions,
                escalated=self.escalated,
                finalized=self.finalized
            )
            info = {
                "message": "Review finalized." if action_type == "finalize_review" else "Episode ended.",
                "final_score": breakdown["final_score"],
                "breakdown": breakdown
            }

        return {
            "observation": self._build_observation(),
            "reward": reward,
            "done": done,
            "info": info
        }

    def state(self) -> Dict[str, Any]:
        return {
            "current_task_id": self.current_task_id,
            "current_task": self.current_task,
            "visible_user_profile": self.visible_user_profile,
            "visible_permissions": self.visible_permissions,
            "visible_policy_rules": self.visible_policy_rules,
            "actions_taken": self.actions_taken,
            "decisions": self.decisions,
            "escalated": self.escalated,
            "finalized": self.finalized,
            "step_count": self.step_count
        }

    def _build_observation(self) -> Observation:
        if not self.current_task:
            raise ValueError("No active task")

        remaining_steps = max(0, self.current_task["max_steps"] - self.step_count)

        return Observation(
            task_id=self.current_task["task_id"],
            title=self.current_task["title"],
            difficulty=self.current_task["difficulty"],
            visible_user_profile=self.visible_user_profile,
            visible_permissions=self.visible_permissions,
            visible_policy_rules=self.visible_policy_rules,
            actions_taken=self.actions_taken,
            decisions=self.decisions,
            escalated=self.escalated,
            finalized=self.finalized,
            step_count=self.step_count,
            remaining_steps=remaining_steps,
            notes=[
                "Use inspect actions to reveal more context before finalizing.",
                "Goal: enforce least privilege while preserving necessary access."
            ]
        )