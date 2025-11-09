from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

class Place(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    date: datetime = Field(default_factory=datetime.utcnow)
    latitude: float = Field()
    longitude: float = Field()
    username: str = Field(..., min_length=1)
    icon: Optional[str] = ""
    order: Optional[int] = 0

    class Config:
        validate_by_name = True