import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const API_URL = "http://127.0.0.1:8000/api/posts";

function Feed() {
  const [posts, setPosts] = useState([]);

  // Cargar posts desde la API
  useEffect(() => {
    fetch(`${API_URL}?page=1&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((err) => {
        console.error("Error cargando posts:", err);
      });
  }, []);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const updatePost = (updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  return (
    <section>
      <PostForm onAddPost={addPost} />

      {posts.length === 0 && (
        <p className="text-muted">No hay publicaciones aún.</p>
      )}

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={deletePost}
          onUpdate={updatePost}
        />
      ))}
    </section>
  );
}

export default Feed;
