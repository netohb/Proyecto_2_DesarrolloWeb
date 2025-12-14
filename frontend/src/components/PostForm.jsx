import { useState } from "react";

function PostForm({ onAddPost }) {
  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState("");
  const [autor, setAutor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!texto || !autor) return;

    const nuevoPost = {
      id: Date.now(),
      texto,
      imagen,
      autor,
      fecha: new Date().toLocaleDateString(),
    };

    onAddPost(nuevoPost);

    setTexto("");
    setImagen("");
    setAutor("");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
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
        className="form-control mb-2"
        placeholder="URL de la imagen (opcional)"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />

      <button className="btn btn-primary">Publicar</button>
    </form>
  );
}

export default PostForm;
