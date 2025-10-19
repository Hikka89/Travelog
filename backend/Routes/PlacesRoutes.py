from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from DB.PlacesRepository import PlacesRepository
from Models.PlacesModel import Place
from Models.UserModel import UserOut
from auth import oauth2_scheme, get_current_user


class PlacesRoutes:
    def __init__(self, repo: PlacesRepository):
        self.repo = repo
        self.oauth2_scheme = oauth2_scheme
        self.router = APIRouter(tags=["Places"])
        self._setup_routes()

    def _setup_routes(self):
        @self.router.post("", response_model=dict)
        def create_user(place: Place, current_user: Annotated[UserOut, Depends(get_current_user)]):
            place_id = self.repo.create_place(place)
            return {"place_id": str(place_id)}

        @self.router.get("", response_model=Place)
        def get_user(email: str, current_user: Annotated[UserOut, Depends(get_current_user)]):
            place = self.repo.get_places_by_email(email)
            if not place:
                raise HTTPException(status_code=404, detail="Places not found")
            return place
