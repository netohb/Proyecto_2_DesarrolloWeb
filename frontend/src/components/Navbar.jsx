function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1877f2" }}>
      <div className="container d-flex align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
          alt="Facebook"
          height="32"
          className="me-2"
        />
        <span className="navbar-brand text-white fw-bold fs-4">
          Facebook
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
