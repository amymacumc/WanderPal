from pydantic import BaseModel, Field

class Chunk(BaseModel):
    type: str  = 'Chunk'
    role: str
    content: str