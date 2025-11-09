from fastapi import FastAPI, WebSocket
from pymongo import MongoClient

from ConnectionManager import ConnectionManager
from DB.PlacesRepository import PlacesRepository
from DB.UserRepository import UserRepository
from Routes.PlacesRoutes import PlacesRoutes
from Routes.UserRoutes import UserRoutes

app = FastAPI()
client = MongoClient("mongodb://mongodb:27017/")
db = client["travelog"]

try:
    db.list_collection_names()
    print("MongoDB init success")
except Exception as e:
    print(f"MongoDB error: {e}")

manager = ConnectionManager()

user_repo = UserRepository(db)
places_repo = PlacesRepository(db)
user_routes = UserRoutes(user_repo)
places_routes = PlacesRoutes(places_repo)

app.include_router(places_routes.router, prefix="/api/place")
app.include_router(user_routes.router, prefix="/api")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        pass
    finally:
        manager.disconnect(websocket)
