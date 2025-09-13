import os

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
        validate_by_name = True

class UserOut(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_name: str = Field(..., min_length=1)
    email: EmailStr
    first_name: Optional[str] = ""
    second_name: Optional[str] = ""
    birthday: datetime = Field(default_factory=datetime.utcnow)
    icon: Optional[str] = ""

    class Config:
        validate_by_name = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None