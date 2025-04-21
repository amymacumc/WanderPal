from typing import List
import uuid
from pydantic import BaseModel, Field
from .daily_plan import DailyPlan

class DailyPlan(BaseModel):
    daily_plan_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    daily_plans: List[DailyPlan]