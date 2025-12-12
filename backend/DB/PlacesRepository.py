from bson import ObjectId
from pymongo.synchronous.database import Database

from Models.PlacesModel import Place
from Models.UserModel import UserOut


class PlacesRepository:
    def __init__(self, db: Database):
        self.collection = db["Places"]

    def create_place(self, place: Place):
        return self.collection.insert_one(place.model_dump()).inserted_id

    def get_places_by_username(self, username: str) -> list[Place] | None:
        data = []
        for doc in self.collection.find({"username": username}):
            if '_id' in doc:
                print(doc)
                doc['_id'] = str(doc['_id'])
                data.append(doc)
        return data

    def add_icon(self, image_id: str, user: UserOut, icon: str):
        self.collection.find_one_and_update({"username": user.user_name, "_id": ObjectId(image_id)},
                                            {"$set": {"icon": icon}},
                                            upsert=True)
        return
