from typing import List
import uuid
from pydantic import BaseModel, Field
from .activity import Activity
from .route import Route

class DailyPlan(BaseModel):
    daily_plan_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    activities: List[Activity]
    routes: List[Route]