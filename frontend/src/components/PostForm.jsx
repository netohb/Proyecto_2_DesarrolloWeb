
import { useState } from "react";

function PostForm({ onAddPost }) {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!autor || !texto) {
      alert("Autor y texto son obligatorios");
      return;
    }

    // Guardar usuario en sessionStorage (requisito del proyecto)
    sessionStorage.setItem("usuario_actual", autor);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Usuario-Id": autor,
        },
        body: JSON.stringify({
          texto: texto,
          imagen_url: imagenUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al crear el post");
      }

      // Crear objeto local para el feed
      const nuevoPost = {
        id: data.post_id,
        usuario_id: autor,
        texto,
        imagen_url: imagenUrl,
        fecha_creacion: new Date().toISOString(),
        likes: 0,
      };

      onAddPost(nuevoPost);

      // Limpiar formulario
      setTexto("");
      setImagenUrl("");
    } catch (error) {
      console.error(error);
      alert("Error al publicar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="¿Qué estás pensando?"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="URL de la imagen (opcional)"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        Publicar
      </button>
    </form>
  );
}

export default PostForm;