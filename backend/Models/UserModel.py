from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class User(BaseModel):
    user_name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    first_name: Optional[str] = ""
    second_name: Optional[str] = ""
    birthday: datetime = Field(default_factory=datetime.utcnow)
    icon: Optional[str] = ""
