# OpenPolicyEnv

**OpenPolicyEnv** is a real-world benchmark environment for evaluating AI agents on enterprise access review, least-privilege enforcement, and compliance-sensitive escalation decisions.

It simulates a common security and governance workflow: reviewing a user's granted permissions, comparing them against policy, deciding what to keep or revoke, and escalating ambiguous high-risk cases when necessary.

This environment is designed in the spirit of **OpenEnv**: a structured, typed, containerized environment with deterministic tasks, programmatic graders, meaningful reward shaping, and a reproducible baseline inference script.

---

## Why this environment matters

Enterprise access review is a real, recurring task in identity governance, security operations, and compliance workflows.

Human reviewers routinely need to answer questions like:

- Should a terminated employee still have access?
- Does a contractor have excessive permissions?
- Is a stale cross-functional permission a privilege-drift issue?
- When should a case be escalated instead of auto-remediated?
- Should temporary executive access be revoked after expiry?

These are realistic, high-value tasks for agent evaluation because they require:

- **partial observability** (inspect before acting)
- **policy reasoning**
- **risk-aware action selection**
- **sequential decision making**
- **tradeoffs between automation and escalation**
- **avoiding destructive mistakes**

---

## Environment Overview

OpenPolicyEnv exposes a standard API:

- `POST /reset?task_id=<task_id>`
- `POST /step`
- `GET /state`
- `GET /tasks`
- `GET /health`

### Interaction pattern

1. `reset(task_id)` → returns the initial observation
2. `step(action)` → returns:
   - `observation`
   - `reward`
   - `done`
   - `info`
3. `state()` → returns current internal environment state

This supports RL-style and agentic evaluation loops.

---

## Observation Space

An observation includes:

- `task_id`
- `title`
- `difficulty`
- `visible_user_profile`
- `visible_permissions`
- `visible_policy_rules`
- `actions_taken`
- `decisions`
- `escalated`
- `finalized`
- `step_count`
- `remaining_steps`
- `notes`

The environment is **partially observable** at reset: agents must use inspection actions to reveal more information before making decisions.

---

## Action Space

Supported actions:

- `inspect_user`
- `inspect_permissions`
- `inspect_policy`
- `revoke_access`
- `keep_access`
- `escalate_review`
- `finalize_review`

Example action payload:

```json
{
  "action_type": "revoke_access",
  "target": "crm_view"
}