from typing import List
from pydantic import BaseModel, Field

class Activity(BaseModel):
    id: str
    image: str
    name: str
    description: str
    food_recommendations: List[str]
    latitude: float
    longitude: float
    infos: List[str]
    tips: List[str]