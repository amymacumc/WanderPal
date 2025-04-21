from pydantic import BaseModel, Field
import uuid

class User(BaseModel):
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    gender: str
    age: int
    location: str
    mbti: str