from fastapi import APIRouter, HTTPException

from DB.UserRepository import UserRepository
from Models.UserModel import User, UserOut


class UserRoutes:
    def __init__(self, repo: UserRepository):
        self.repo = repo
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
        def list_users():
            return self.repo.get_all_users()
