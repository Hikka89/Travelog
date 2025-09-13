from fastapi import FastAPI
from pymongo import MongoClient

from DB.UserRepository import UserRepository
from Routes.UserRoutes import UserRoutes

app = FastAPI()
client = MongoClient("mongodb://mongodb:27017/")
db = client["travelog"]

try:
    db.list_collection_names()
    print("MongoDB init success")
except Exception as e:
    print(f"MongoDB error: {e}")

user_repo = UserRepository(db)
user_routes = UserRoutes(user_repo)
app.include_router(user_routes.router, prefix="/api")
