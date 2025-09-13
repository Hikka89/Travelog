import os
from typing import Annotated

import jwt
from datetime import timedelta, timezone, datetime

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from jwt import InvalidTokenError
from pymongo.database import Database
from Models.UserModel import User, UserOut, TokenData
from auth import oauth2_scheme

load_dotenv()

key = os.getenv('JWT_KEY')
alg = os.getenv('ALGORITHM')

class UserRepository:
    def __init__(self, db: Database):
        self.collection = db["Users"]

    def create_user(self, user: User):
        return self.collection.insert_one(user.model_dump()).inserted_id

    def get_user_by_email(self, email: str) -> UserOut | None:
        data = self.collection.find_one({"email": email})
        return UserOut(**data) if data else None

    def get_all_users(self) -> list[UserOut]:
        data = []
        for doc in self.collection.find():
            del doc['password']
            if '_id' in doc:
                doc['_id'] = str(doc['_id'])
                data.append(UserOut(**doc))
        return data

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, key, algorithm=alg)
        return encoded_jwt

    def authenticate_user(self, email: str, password: str) -> User or bool:
        data = self.collection.find_one({"email": email})
        if data is None:
            return False
        if '_id' in data:
            data['_id'] = str(data['_id'])
        user = User(**data)
        if not user:
            return False
        if not (user.password == password and user.email == user.email):
            return False
        return user

