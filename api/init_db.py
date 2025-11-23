import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DB_PATH = os.path.join(DATA_DIR, "posts.db")
SCHEMA_PATH = os.path.join(BASE_DIR, "schema.sql")


def initialize_database():
    """
    Crea la base de datos posts.db y ejecuta schema.sql.
    """

    # Crear carpeta /data si no existe
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)

    # Crear/Conectar BD
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Ejecutar schema.sql
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema_sql = f.read()
        cursor.executescript(schema_sql)

    conn.commit()
    conn.close()
    print("Base de datos creada en:", DB_PATH)


if __name__ == "__main__":
    initialize_database()
