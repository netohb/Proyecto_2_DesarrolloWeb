import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Spotify from "./components/Spotify";
import Autores from "./components/Autores";
import Footer from "./components/Footers";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="container my-4" style={{ maxWidth: "600px" }}>
        <Feed />
        <Spotify />
        <Autores />
      </main>

      <Footer />
    </>
  );
}

export default App;
