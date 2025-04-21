from typing import List
from pydantic import BaseModel, Field

class Activity(BaseModel):
    name: str
    description: str
    food_recommendations: List[str]
