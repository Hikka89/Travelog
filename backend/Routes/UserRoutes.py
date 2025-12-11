import base64
import os
import random
import smtplib
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
server_email = os.getenv('SERVER_EMAIL')
server_email_pass = os.getenv('SERVER_EMAIL_PASS')
key = os.getenv('JWT_KEY')
alg = os.getenv('ALGORITHM')

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
        def get_user(username: str, current_user: Annotated[UserOut, Depends(get_current_user)]):
            user = self.repo.get_user_by_username(username)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user

        @self.router.get("/users", response_model=list[UserOut])
        def list_users(
                current_user: Annotated[UserOut, Depends(get_current_user)]
        ):
            return self.repo.get_all_users()

        @self.router.post("/recover/message", response_model=list[UserOut])
        def recover_message(
                email: str
        ):
            rand = random.randint(100000,999999)
            print(rand)
            mail = smtplib.SMTP('smtp.mail.ru', 587)
            mail.starttls()
            mail.login(server_email, server_email_pass)
            mail.sendmail(server_email, email, f'Ваш код для восстановления: {rand}')
            mail.close()

            return self.repo.get_all_users()

        @self.router.get("/recover", response_model=list[UserOut])
        def recover(
                code: str,
                email: str
        ):
            user_code = self.repo.get_recovery_code_by_email(email)
            if code == user_code:
                rand = random.randint(10000000, 999999999)
                mail = smtplib.SMTP('smtp.mail.ru', 465)
                mail.starttls()
                mail.login(server_email, server_email_pass)
                mail.sendmail(server_email, email, f'Ваш новый пароль: {rand}')
                mail.close()
                self.repo.change_pass(email, str(rand))

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
