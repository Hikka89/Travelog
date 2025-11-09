import base64
from io import BytesIO
from typing import Annotated

import magic
from PIL import Image
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse

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

        @self.router.post("/icon")
        async def upload_image(image_id: str, current_user: Annotated[UserOut, Depends(get_current_user)],
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

                self.repo.add_icon(image_id, current_user, webp_base64)

                return JSONResponse(content={"message": "Изображение успешно загружено", "mime_type": mime_type})

            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))
