import os
from typing import Annotated

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from pymongo import MongoClient

from Models.UserModel import TokenData, User

client = MongoClient("mongodb://mongodb:27017/")
db = client["travelog"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

load_dotenv()

key = os.getenv('JWT_KEY')
alg = os.getenv('ALGORITHM')


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, key, algorithms=[alg])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    print(token_data)
    data = db['Users'].find_one({"user_name": token_data.username})
    if '_id' in data:
        data['_id'] = str(data['_id'])
    user = User(**data)
    if user is None:
        raise credentials_exception
    return user
