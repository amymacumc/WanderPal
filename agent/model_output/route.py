from typing import List
from pydantic import BaseModel

class Route(BaseModel):
    way: str
    distance: str
    time: str
    from_name: str
    to_name: str