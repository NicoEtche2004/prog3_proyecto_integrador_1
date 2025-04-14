import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import FormularioFiltro from "../../components/FormularioFiltro/FormularioFiltro";
import "./style.css";

export default class EnBreve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      backuppeliculas: [],
      pagina: 1,
      cargando: true,
    };
  }

  componentDidMount() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${this.state.pagina}`;

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const nuevasPeliculas = this.state.peliculas.concat(data.results);
        this.setState({
          peliculas: nuevasPeliculas,
          backuppeliculas: nuevasPeliculas,
          pagina: this.state.pagina + 1,
          cargando: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ cargando: false });
      });
  }

  filtrarPeliculas = (filtroUsuario) => {
    const peliculasFiltradas = this.state.backuppeliculas.filter((peli) =>
      peli.title.toLowerCase().includes(filtroUsuario.toLowerCase())
    );
    this.setState({ peliculas: peliculasFiltradas });
  };

  render() {
    if (this.state.cargando) {
      return (
        <div className="loading-container">
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="Cargando..."
            width="100"
          />
          <p>Cargando...</p>
        </div>
      );
    }

    return (
      <>
        <FormularioFiltro filtro={this.filtrarPeliculas} />
        <h2>Próximos Estrenos</h2>
        <div className="tarjetas-container">
          {this.state.peliculas.length > 0 ? (
            this.state.peliculas.map((elm, idx) => (
              <Tarjeta key={`${elm.title}-${idx}`} pelicula={elm} />
            ))
          ) : (
            <p>No se encontraron películas.</p>
          )}
        </div>
        <button onClick={() => this.cargarPeliculas()}>Ver más</button>
      </>
    );
  }
}
