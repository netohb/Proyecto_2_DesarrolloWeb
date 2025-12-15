import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(_file_))
DB_PATH = os.path.join(BASE_DIR, "data", "posts.db")

def create_tables():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id TEXT NOT NULL,
        texto TEXT NOT NULL,
        imagen_url TEXT,
        fecha_creacion TEXT NOT NULL,
        likes INTEGER DEFAULT 0
    );
    """)

    conn.commit()
    conn.close()
    print(" Base de datos y tabla 'posts' creadas correctamente")

if _name_ == "_main_":
    create_tables()