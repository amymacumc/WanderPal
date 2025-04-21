from typing import List
from pydantic import BaseModel
class RecommendTravel(BaseModel):
    id: str
    name: str
    dailyPlan: List[List[str]]
    estimatedBudget: str

class RecommendTravels(BaseModel):
    recommend_travels: List[RecommendTravel]