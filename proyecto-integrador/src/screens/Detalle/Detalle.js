import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,
      favorito: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
      .then((res) => res.json())
      .then((data) => {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const esFav = favoritos.some((p) => p.id === data.id);

        this.setState({
          pelicula: data,
          favorito: esFav,
        });
      });
  }

  toggleFavorito = () => {
    const { pelicula, favorito } = this.state;

    let favsLocal = JSON.parse(localStorage.getItem("favoritos")) || [];
    let favsSession = JSON.parse(sessionStorage.getItem("favoritos")) || [];

    if (favorito) {
      favsLocal = favsLocal.filter((p) => p.id !== pelicula.id);
      favsSession = favsSession.filter((p) => p.id !== pelicula.id);
    } else {
      favsLocal.push(pelicula);
      favsSession.push(pelicula);
    }

    localStorage.setItem("favoritos", JSON.stringify(favsLocal));
    sessionStorage.setItem("favoritos", JSON.stringify(favsSession));

    this.setState({ favorito: !favorito });
  };

  render() {
    const { pelicula, favorito } = this.state;

    if (!pelicula) {
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
      <div className="detalle-container">
        <div className="detalle-header">
          <img
            className="detalle-img"
            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
            alt={pelicula.title}
          />
          <div className="detalle-info">
            <h1>{pelicula.title}</h1>
            <p className="descripcion">{pelicula.overview}</p>
            <p><strong>Estreno:</strong> {pelicula.release_date}</p>

            <h3>Géneros:</h3>
            <ul>
              {pelicula.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>

            <div className="button-group">
              <button onClick={this.toggleFavorito}>
                {favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              </button>
              <Link to="/">
                <button>Volver a la Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
