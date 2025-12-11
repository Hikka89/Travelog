import os
from datetime import timedelta, timezone, datetime

import jwt
from dotenv import load_dotenv
from pymongo.database import Database

from Models.UserModel import User, UserOut

load_dotenv()

key = os.getenv('JWT_KEY')
alg = os.getenv('ALGORITHM')


class UserRepository:
    def __init__(self, db: Database):
        self.collection = db["Users"]

    def create_user(self, user: User):
        return self.collection.insert_one(user.model_dump()).inserted_id

    def get_recovery_code_by_email(self, email: str) -> str | None:
        data = self.collection.find_one({"email": email})
        print(data)
        return data['recovery_code'] if data else None

    def change_pass(self, email: str, password: str) -> None:
        data = self.collection.update_one({"email": email}, {"password": password})
        return

    def get_user_by_email(self, email: str) -> UserOut | None:
        data = self.collection.find_one({"email": email})
        print(data)
        if '_id' in data:
            data['_id'] = str(data['_id'])
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

    def authenticate_user(self, username: str, password: str) -> User or bool:
        data = self.collection.find_one({"user_name": username})
        if data is None:
            return False
        if '_id' in data:
            data['_id'] = str(data['_id'])
        user = User(**data)
        if not user:
            return False
        if not (user.password == password and user.user_name == username):
            return False
        return user

    def add_avatar(self, user: UserOut, avatar: str):
        self.collection.find_one_and_update({"user_name": user.user_name},
                                            {"$set": {"avatar": avatar}},
                                            upsert=True)
        return
