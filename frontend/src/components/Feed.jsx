import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const API_URL = "http://127.0.0.1:8000/api/posts";

function Feed() {
  const [posts, setPosts] = useState([]);

  // -------------------------------
  // CARGA INICIAL DEL FEED
  // -------------------------------
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    const lastFetch = localStorage.getItem("lastFetch");

    //  Si ya hay posts guardados
    if (storedPosts && lastFetch) {
      setPosts(JSON.parse(storedPosts));

      // Pedir solo posts nuevos
      fetch(`${API_URL}?fecha_minima=${lastFetch}`)
        .then((res) => res.json())
        .then((newPosts) => {
          if (newPosts.length > 0) {
            const updatedPosts = [...newPosts, ...JSON.parse(storedPosts)];
            setPosts(updatedPosts);
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            localStorage.setItem("lastFetch", new Date().toISOString());
          }
        })
        .catch(console.error);

    } else {
      // Primera vez → cargar TODO desde la API
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          localStorage.setItem("posts", JSON.stringify(data));
          localStorage.setItem("lastFetch", new Date().toISOString());
        })
        .catch(console.error);
    }
  }, []);

  // -------------------------------
  // CRUD LOCAL 
  // -------------------------------
  const addPost = (post) => {
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const deletePost = (id) => {
    const updated = posts.filter((post) => post.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const updatePost = (updatedPost) => {
    const updated = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
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
