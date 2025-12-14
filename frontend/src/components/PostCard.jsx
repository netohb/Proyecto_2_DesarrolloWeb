import { useState } from "react";

function PostCard({ post, onDelete, onUpdate }) {
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(post.texto);

  const guardarCambios = () => {
    onUpdate({ ...post, texto });
    setEditando(false);
  };

  return (
    <div className="card mb-3">
      {post.imagen && (
        <img src={post.imagen} className="card-img-top" />
      )}

      <div className="card-body">
        <h5>{post.autor}</h5>

        {editando ? (
          <textarea
            className="form-control mb-2"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        ) : (
          <p>{post.texto}</p>
        )}

        <small className="text-muted">{post.fecha}</small>

        <div className="mt-2">
          {editando ? (
            <button className="btn btn-success btn-sm me-2" onClick={guardarCambios}>
              Guardar
            </button>
          ) : (
            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditando(true)}>
              Editar
            </button>
          )}

          <button className="btn btn-danger btn-sm" onClick={() => onDelete(post.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
