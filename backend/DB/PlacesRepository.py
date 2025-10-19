from pymongo.synchronous.database import Database

from Models.PlacesModel import Place


class PlacesRepository:
    def __init__(self, db: Database):
        self.collection = db["Places"]

    def create_place(self, place: Place):
        return self.collection.insert_one(place.model_dump()).inserted_id

    def get_places_by_email(self, email: str) -> list[Place] | None:
        data = self.collection.find({"email": email})
        return data if data else None

    # def get_all_users(self) -> list[UserOut]:
    #     data = []
    #     for doc in self.collection.find():
    #         del doc['password']
    #         if '_id' in doc:
    #             doc['_id'] = str(doc['_id'])
    #             data.append(UserOut(**doc))
    #     return data