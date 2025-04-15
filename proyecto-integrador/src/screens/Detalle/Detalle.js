import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Detalle extends Component {
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
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ',
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        let storage = localStorage.getItem("favoritos");
        let esFavorito = false;

        if (storage !== null) {
          let favoritosParseados = JSON.parse(storage);
          esFavorito = favoritosParseados.includes(data.id);
        }

        this.setState({
          pelicula: data,
          favorito: esFavorito,
        });
      });
  }

  agregarAFavoritos(id) {
    let storage = localStorage.getItem("favoritos");

    if (storage !== null) {
      let arrParseado = JSON.parse(storage);

      if (!arrParseado.includes(id)) {
        arrParseado.push(id);
        let arrStringificado = JSON.stringify(arrParseado);
        localStorage.setItem("favoritos", arrStringificado);
        this.setState({ favorito: true });
      }
    } else {
      let primerID = [id];
      let arrStringificado = JSON.stringify(primerID);
      localStorage.setItem("favoritos", arrStringificado);
      this.setState({ favorito: true });
    }
  }

  quitarDeFavoritos(id) {
    const storage = localStorage.getItem("favoritos");
    const storageParseado = JSON.parse(storage);
    const filtrarStorage = storageParseado.filter((elm) => elm !== id);
    const storageStringificado = JSON.stringify(filtrarStorage);
    localStorage.setItem("favoritos", storageStringificado);

    this.setState({
      favorito: false,
    });
  }

  render() {
    const pelicula = this.state.pelicula;

    if (!pelicula) {
      return <p>Cargando...</p>;
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
              {this.state.favorito ? (
                <button onClick={() => this.quitarDeFavoritos(pelicula.id)}>
                  Quitar de favoritos
                </button>
              ) : (
                <button onClick={() => this.agregarAFavoritos(pelicula.id)}>
                  Agregar a favoritos
                </button>
              )}

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

export default Detalle;