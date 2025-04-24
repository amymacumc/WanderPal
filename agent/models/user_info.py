from __future__ import annotations
from typing import List
from uuid import uuid4
from pydantic import BaseModel, Field

class UserInfo(BaseModel):
    available_time: str
    destination: str
    budget: str
    travel_purpose: str
    intensity: str
    mood: str
    other: str

    def is_info_complete(self) -> bool:
        """
        判断信息是否收集完整
        """
        if not self.available_time or not self.destination or not self.budget or \
           not self.travel_purpose or not self.intensity or not self.mood or not self.other:
            return False
        return True
    
    def update(self, user_info: UserInfo):
        """
        将另一个 UserInfo 对象中的非空信息合并进当前对象
        """
        for field in self.__fields__:
            current_val = getattr(self, field)
            new_val = getattr(user_info, field)
            if not current_val and new_val:
                setattr(self, field, new_val)
