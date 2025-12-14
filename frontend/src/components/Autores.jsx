import Neto from "../assets/Neto.jpg";
import Benito from "../assets/Benito.jpg";
import Mariana from "../assets/mariana.jpg";

function Autores() {
  const autores = [
    {
      nombre: "ERNESTO ELIEZER HERNANDEZ BERNAL",
      foto: Neto,
    },
    {
      nombre: "ABEL BENITO CARRASCO HERNANDEZ",
      foto: Benito,
    },
    {
      nombre: "MARIANA MARQUEZ GIL",
      foto: Mariana,
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="mb-4 text-center">Autores del proyecto</h2>

      <div className="row justify-content-center">
        {autores.map((autor, index) => (
          <div key={index} className="col-6 col-md-3 text-center mb-4">
            <img
              src={autor.foto}
              alt={autor.nombre}
              className="img-fluid rounded-circle mb-2"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
              }}
            />
            <p className="fw-semibold">{autor.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Autores;
