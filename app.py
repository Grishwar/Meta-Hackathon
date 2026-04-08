from fastapi import FastAPI, HTTPException
from env.models import Action, StepResponse, Observation
from env.environment import OpenPolicyEnvironment
from env.tasks import TASKS

app = FastAPI(
    title="OpenPolicyEnv",
    version="1.1.0",
    description="A benchmark environment for enterprise access review, least-privilege enforcement, and compliance escalation."
)

env = OpenPolicyEnvironment()


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
def tasks():
    return {"tasks": list(TASKS.keys())}


@app.post("/reset", response_model=Observation)
def reset(task_id: str):
    try:
        return env.reset(task_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/step", response_model=StepResponse)
def step(action: Action):
    try:
        result = env.step(
            action_type=action.action_type,
            target=action.target,
            reason=action.reason
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/state")
def state():
    try:
        return env.state()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))