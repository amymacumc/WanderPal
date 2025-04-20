from pydantic import BaseModel, Field

class Message(BaseModel):
    type: str  = 'Message'
    role: str
    content: str