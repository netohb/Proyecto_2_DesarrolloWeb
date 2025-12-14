import { useEffect } from "react";

function Spotify() {
  //  artitas 
  const wrappedArtists = [
    {
      name: "Taylor Swift",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStJYOYuQt4bRmfclSp56rggha-bhB0S8OSFQ&s",
    },
    {
      name: "Bad Bunny",
      image:
        "https://www.billboard.com/wp-content/uploads/2025/11/Bad-Bunny-2025-Credit-Eric-Rojas-billboard-1800.jpg?w=942&h=628&crop=1",
    },
    {
      name: "Kanye West",
      image:
        "https://www.telemundo.com/sites/nbcutelemundo/files/styles/fit-560w/public/images/article/cover/2014/10/27/kanye-west-vertical.jpg?ramen_itok=iqwQftIcTf",
    },
    {
      name: "The Beatles",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSdwMqR3ME9Gk0zKASy1qVqHnRE8yK8O-qQ&s",
    },
    {
      name: "Dua Lipa",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYRfvq7MhZ5-jjA2eXnRKXIThRT5Ha5oQIIg&s",
    },
    {
      name: "Rauw Alejandro",
      image:
        "https://static01.nyt.com/images/2021/06/25/arts/25alejandro-review01-esp-1/25alejandro-review01-mediumSquareAt3X.jpg",
    },
  ];

  //  Llamada a TU API (requisito del proyecto)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/spotify/new-releases?limit=1", {
      headers: {
        "X-Usuario-Id": "mariana",
      },
    }).catch(() => {});
  }, []);

  return (
    <section className="mt-5">
      {/* HEADER TIPO PUBLICACIÓN */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
              alt="Spotify"
              style={{ width: "28px", marginRight: "10px" }}
            />
            <strong>Spotify</strong>
          </div>

          <p className="mb-1">
            <strong>
              El wrap de este año de los artistas más escuchados mundialmente
              son:
            </strong>
          </p>

        </div>

        {/* GRID DE ARTISTAS */}
        <div className="row g-0 p-3">
          {wrappedArtists.map((artist, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <img
                  src={artist.image}
                  className="card-img-top"
                  alt={artist.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="mb-0">{artist.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Spotify;
