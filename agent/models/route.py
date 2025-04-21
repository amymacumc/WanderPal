from typing import List
from pydantic import BaseModel

class ActivityIDs(BaseModel):
    from_: str  # 注意：from 是 Python 保留字
    to: str

class Route(BaseModel):
    way: str
    distance: str
    time: str
    activity_ids: ActivityIDs