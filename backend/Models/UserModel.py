from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    first_name: Optional[str] = ""
    second_name: Optional[str] = ""
    birthday: datetime = Field(default_factory=datetime.utcnow)
    icon: Optional[str] = ""

    class Config:
        allow_population_by_field_name = True

class UserOut(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_name: str = Field(..., min_length=1)
    email: EmailStr
    first_name: Optional[str] = ""
    second_name: Optional[str] = ""
    birthday: datetime = Field(default_factory=datetime.utcnow)
    icon: Optional[str] = ""

    class Config:
        allow_population_by_field_name = True
