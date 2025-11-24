from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from . import models


# ================================================
#               SCHEMAS (Pydantic)
# ================================================

class PostCreate(BaseModel):
    texto: str
    imagen_url: Optional[str] = None


class PostUpdate(BaseModel):
    texto: Optional[str] = None
    imagen_url: Optional[str] = None
    likes: Optional[int] = None


# ================================================
#                ROUTER DE POSTS
# ================================================

router = APIRouter(
    prefix="/api/posts",
    tags=["Posts"]
)


# ================================================
#                      ENDPOINTS
# ================================================


# ---- GET Paginated posts ----
@router.get("/")
def get_posts(page: int = 1, limit: int = 10):
    return models.get_posts_from_db(page, limit)


# ---- GET One post ----
@router.get("/{post_id}")
def get_post(post_id: int):
    post = models.get_post_by_id_from_db(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post no encontrado")
    return post


# ---- CREATE post ----
@router.post("/")
def create_post(
    post_data: PostCreate,
    x_usuario_id: str = Header(None, alias="X-Usuario-Id")
):
    if not x_usuario_id:
        raise HTTPException(status_code=400, detail="Header 'X-Usuario-Id' es requerido")

    new_id = models.create_post_in_db({
        "usuario_id": x_usuario_id,
        "texto": post_data.texto,
        "imagen_url": post_data.imagen_url,
        "fecha_creacion": datetime.now().isoformat(),
        "likes": 0
    })

    return {"success": True, "post_id": new_id}


# ---- UPDATE post ----
@router.patch("/{post_id}")
def update_post(
    post_id: int,
    post_data: PostUpdate,
    x_usuario_id: str = Header(None, alias="X-Usuario-Id")
):

    if not x_usuario_id:
        raise HTTPException(status_code=400, detail="Header 'X-Usuario-Id' es requerido")

    updated = models.update_post_in_db(post_id, x_usuario_id, post_data.dict(exclude_unset=True))

    if not updated:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para modificar este post o no existe"
        )

    return {"success": True, "message": "Post actualizado"}


# ---- DELETE post ----
@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    x_usuario_id: str = Header(None, alias="X-Usuario-Id")
):

    if not x_usuario_id:
        raise HTTPException(status_code=400, detail="Header 'X-Usuario-Id' es requerido")

    deleted = models.delete_post_in_db(post_id, x_usuario_id)

    if not deleted:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para eliminar este post o no existe"
        )

    return {"success": True, "message": "Post eliminado"}
