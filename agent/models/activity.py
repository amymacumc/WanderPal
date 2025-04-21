from typing import List
import uuid
from pydantic import BaseModel, Field
from .daily_plan import Da

class Activity(BaseModel):
    activity_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    image: str
    description: str