from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from .spotify_service import get_new_releases

router = APIRouter(
    prefix="/api/spotify",
    tags=["Spotify"]
)

@router.get("/new-releases")
def get_spotify_new_releases(
    limit: int = 10,
    x_usuario_id: Optional[str] = Header(None, alias="X-Usuario-Id")
):
    if not x_usuario_id:
        raise HTTPException(status_code=400, detail="X-Usuario-Id es requerido")

    try:
        return {
            "usuario": x_usuario_id,
            "albums": get_new_releases(limit)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
