from typing import List
from pydantic import BaseModel, Field
from .activity import Activity
from .route import Route

class DailyPlan(BaseModel):
    activities: List[Activity]
    routes: List[Route]
    precautions: List[str]
    latitude: float
    longitude: float

class DailyPlans(BaseModel):
    daily_plans: List[DailyPlan]

