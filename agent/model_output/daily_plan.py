from typing import List
from pydantic import BaseModel, Field
from .activity import Activity
from .route import Route

class DailyPlan(BaseModel):
    activities: List[Activity]
    routes: List[Route]

class DailyPlans(BaseModel):
    id: str
    title: str
    location: str
    daily_plans: List[DailyPlan]
    reminder: List[str]

