from pymongo.database import Database

from Models.UserModel import User, UserOut


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
