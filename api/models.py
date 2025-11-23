import sqlite3
import os
import math
from typing import List, Dict, Any, Optional

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "data", "posts.db")


def get_db_connection():
    """
    Abre una conexión SQLite y devuelve filas como diccionarios.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ============================================================
#                   CRUD COMPLETO DE POSTS
# ============================================================


def get_posts_from_db(page: int = 1, limit: int = 10) -> Dict[str, Any]:
    """
    Obtiene una lista paginada de posts.
    """
    if page < 1:
        page = 1
    if limit < 1 or limit > 50:
        limit = 10

    offset = (page - 1) * limit

    conn = get_db_connection()
    cursor = conn.cursor()

    # Total de registros
    cursor.execute("SELECT COUNT(*) FROM posts")
    total_records = cursor.fetchone()[0]
    total_pages = math.ceil(total_records / limit)

    # Obtener posts
    cursor.execute(
        """
        SELECT id, usuario_id, texto, imagen_url, fecha_creacion, likes
        FROM posts
        ORDER BY fecha_creacion DESC
        LIMIT ? OFFSET ?
        """,
        (limit, offset),
    )

    posts = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return {
        "page": page,
        "limit": limit,
        "total_records": total_records,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1,
        "posts": posts,
    }


def get_post_by_id_from_db(post_id: int) -> Optional[Dict[str, Any]]:
    """
    Obtiene un solo post por ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, usuario_id, texto, imagen_url, fecha_creacion, likes
        FROM posts
        WHERE id = ?
        """,
        (post_id,),
    )

    row = cursor.fetchone()
    conn.close()

    if row:
        return dict(row)
    return None


def create_post_in_db(data: Dict[str, Any]) -> int:
    """
    Inserta un nuevo post.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO posts (usuario_id, texto, imagen_url, fecha_creacion, likes)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            data["usuario_id"],
            data["texto"],
            data.get("imagen_url"),
            data["fecha_creacion"],
            data.get("likes", 0),
        ),
    )

    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return new_id


def update_post_in_db(post_id: int, usuario_header: str, data: Dict[str, Any]) -> bool:
    """
    Actualiza un post. Solo si el usuario que lo creó coincide con el header.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Validar propiedad del post
    cursor.execute("SELECT usuario_id FROM posts WHERE id = ?", (post_id,))
    row = cursor.fetchone()
    if row is None:
        conn.close()
        return False  # no existe

    creador = row["usuario_id"]
    if creador != usuario_header:
        conn.close()
        return False  # NO autorizado

    # Construcción dinámica de campos
    fields = []
    values = []
    for field in ["texto", "imagen_url", "likes"]:
        if field in data:
            fields.append(f"{field} = ?")
            values.append(data[field])

    if not fields:
        conn.close()
        return False  # nada que actualizar

    values.append(post_id)

    cursor.execute(f"UPDATE posts SET {', '.join(fields)} WHERE id = ?", values)
    conn.commit()
    updated = cursor.rowcount > 0
    conn.close()

    return updated


def delete_post_in_db(post_id: int, usuario_header: str) -> bool:
    """
    Borra un post solo si el usuario coincide con el creador.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT usuario_id FROM posts WHERE id = ?", (post_id,))
    row = cursor.fetchone()

    if row is None:
        conn.close()
        return False  # no existe

    if row["usuario_id"] != usuario_header:
        conn.close()
        return False  # no autorizado

    cursor.execute("DELETE FROM posts WHERE id = ?", (post_id,))
    conn.commit()
    deleted = cursor.rowcount > 0

    conn.close()
    return deleted
