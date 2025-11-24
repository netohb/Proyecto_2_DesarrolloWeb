DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id TEXT NOT NULL,
    texto TEXT NOT NULL,
    imagen_url TEXT,
    fecha_creacion TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);
