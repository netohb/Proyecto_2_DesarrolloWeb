# Proyecto_2_DesarrolloWeb

Este repositorio es para trabajar en el segundo proyecto integrador de la materia de Introducción al Desarrollo Web, Otoño 2025 (ITAM).

**Resumen del producto**

Aplicación web estilo red social que permite crear publicaciones con texto e imágenes,
consumiendo una API propia desarrollada en FastAPI.  
Además, integra una API externa (Spotify Web API) para mostrar información musical
a través de un endpoint intermedio propio.
El frontend está desarrollado con React + Vite y Bootstrap, mientras que el backend
está construido en Python con FastAPI.

**Instrucciones para levantar el frontend**
El frontend del proyecto está desarrollado con React utilizando Vite.
Para levantar la aplicación, es necesario ubicarse dentro de la carpeta frontend del proyecto desde la terminal y ejecutar el comando npm run dev.

Al hacerlo, la aplicación quedará disponible en el navegador en la dirección http://localhost:5173, donde se puede visualizar la interfaz del proyecto y su interacción con el backend.
**Instrucciones para levantar el backend**

El backend del proyecto está desarrollado con FastAPI y se ejecuta utilizando Python. Para levantarlo, primero es necesario instalar las dependencias del proyecto a partir del archivo requirements.txt. Una vez instaladas, el servidor se puede iniciar ejecutando el comando `python -m uvicorn api.app:app --reload` Nota: se tiene que estar en la rita ../Proyecto_2_DesarrolloWeb. Al hacerlo, la API queda disponible en http://127.0.0.1:8000, y la documentación interactiva de los endpoints puede consultarse en http://127.0.0.1:8000/docs.

---

## 👥 Integrantes
- **Ernesto Hernández Bernal**
- **Mariana Márquez Gil**
- **Abel Benito Carrasco Hernández**
