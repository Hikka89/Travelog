from pymongo.database import Database

from Models.UserModel import User

class UserRepository:
    def __init__(self, db: Database):
        self.collection = db["Users"]

    def create_user(self, user: User):
        return self.collection.insert_one(user.model_dump()).inserted_id

    def get_user_by_email(self, email: str) -> User | None:
        data = self.collection.find_one({"email": email})
        return User(**data) if data else None

    def get_all_users(self) -> list[User]:
        return [User(**doc) for doc in self.collection.find()]
