from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Importar rutas
from . import routes_posts


# --------------------------------------------------
#              CREAR APP FASTAPI
# --------------------------------------------------
app = FastAPI(
    title="API Feed Estilo Facebook",
    description="Backend para manejar posts, imágenes, likes y usuario vía headers.",
    version="1.0.0"
)


# --------------------------------------------------
#                      CORS
# --------------------------------------------------
origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5173",   # Vite
    "http://localhost:5173",   # Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # quién puede acceder
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
#            ENDPOINT DE SALUD (PRUEBA)
# --------------------------------------------------
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "API funcionando correctamente"}


# --------------------------------------------------
#                REGISTRO DE RUTAS
# --------------------------------------------------
app.include_router(routes_posts.router)


# --------------------------------------------------
#                 EJECUCIÓN DIRECTA
# --------------------------------------------------
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
