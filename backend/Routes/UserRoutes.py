import base64
import os
from datetime import timedelta
from io import BytesIO
from typing import Annotated

import magic
from PIL import Image
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.responses import JSONResponse
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
        self.router = APIRouter(tags=["Users"])
        self._setup_routes()

    def _setup_routes(self):
        @self.router.post("/users/register", response_model=dict)
        def create_user(user: User):
            user_id = self.repo.create_user(user)
            return {"user_id": str(user_id)}

        @self.router.get("/users/{email}", response_model=UserOut)
        def get_user(email: str, current_user: Annotated[UserOut, Depends(get_current_user)]):
            user = self.repo.get_user_by_email(email)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user

        @self.router.get("/users", response_model=list[UserOut])
        def list_users(
                current_user: Annotated[UserOut, Depends(get_current_user)]
        ):
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
                data={"sub": user.user_name}, expires_delta=access_token_expires
            )
            return Token(access_token=access_token, token_type="bearer")

        @self.router.post("/users/avatar")
        async def upload_image(current_user: Annotated[UserOut, Depends(get_current_user)],
                               file: UploadFile = File(...)):
            try:
                contents = await file.read()

                mime_type = magic.from_buffer(contents, mime=True)
                if not mime_type.startswith("image/"):
                    raise HTTPException(status_code=400, detail="Файл не является изображением")

                image = Image.open(BytesIO(contents)).convert("RGB")
                resized_image = image.resize((512, 512))
                buffer = BytesIO()
                resized_image.save(buffer, format="WEBP")
                buffer.seek(0)

                webp_base64 = base64.b64encode(buffer.read()).decode("utf-8")

                self.repo.add_avatar(current_user, webp_base64)

                return JSONResponse(content={"message": "Изображение успешно загружено", "mime_type": mime_type})

            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))
