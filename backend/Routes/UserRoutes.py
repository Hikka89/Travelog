import os
from datetime import timedelta
from typing import Annotated

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Depends, status, Security
from fastapi.security import OAuth2PasswordRequestForm

from DB.UserRepository import UserRepository
from Models.UserModel import User, UserOut, Token
from auth import oauth2_scheme, get_current_user

load_dotenv()
exp = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

class UserRoutes:
    def __init__(self, repo: UserRepository):
        self.repo = repo
        self.oauth2_scheme = oauth2_scheme
        self.router = APIRouter()
        self._setup_routes()

    def _setup_routes(self):
        @self.router.post("/users", response_model=dict)
        def create_user(user: User):
            user_id = self.repo.create_user(user)
            return {"user_id": str(user_id)}

        @self.router.get("/users/{email}", response_model=UserOut)
        def get_user(email: str):
            user = self.repo.get_user_by_email(email)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user

        @self.router.get("/users", response_model=list[UserOut])
        def list_users(
                current_user: Annotated[UserOut, Depends(get_current_user)]
        ):
            print(current_user)
            return self.repo.get_all_users()

        @self.router.post("/token")
        async def login_for_access_token(
                form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        ) -> Token:
            user = self.repo.authenticate_user(form_data.username, form_data.password)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect username or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            access_token_expires = timedelta(minutes=int(exp))
            access_token = self.repo.create_access_token(
                data={"sub": user.email}, expires_delta=access_token_expires
            )
            return Token(access_token=access_token, token_type="bearer")
