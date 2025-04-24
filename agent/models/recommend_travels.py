from typing import List
from pydantic import BaseModel
class RecommendTravel(BaseModel):
    id: str
    title: str
    location: str
    image: str
    daily_plan: List[List[str]]
    estimated_budget: str

class RecommendTravels(BaseModel):
    recommend_travels: List[RecommendTravel]