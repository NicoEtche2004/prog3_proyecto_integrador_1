import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Tarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPelicula: props.pelicula,
      favorito: false,
      mostrarDescripcion: false,
    };
  }

  componentDidMount() {
    let storage = localStorage.getItem("favoritos");
    if (storage !== null) {
      let storageParseado = JSON.parse(storage);
      let estaMiId = storageParseado.includes(this.state.dataPelicula.id);

      if (estaMiId) {
        this.setState({ favorito: true });
      }
    }
  }

  agregarAFavoritos(id) {
    let storage = localStorage.getItem("favoritos");

    if (storage !== null) {
      let arrParseado = JSON.parse(storage);
      arrParseado.push(id);
      let arrStringificado = JSON.stringify(arrParseado);
      localStorage.setItem("favoritos", arrStringificado);
    } else {
      let primerID = [id];
      let arrStringificado = JSON.stringify(primerID);
      localStorage.setItem("favoritos", arrStringificado);
    }

    this.setState({
      favorito: true,
    });
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

  toggleDescripcion = () => {
    this.setState((prev) => ({
      mostrarDescripcion: !prev.mostrarDescripcion,
    }));
  };

  render() {
    return (
      <div className="tarjeta">
        <img
          src={`https://image.tmdb.org/t/p/w500${this.state.dataPelicula.poster_path}`}
          alt={this.state.dataPelicula.title}
          width="200"
          height="300"
        />

        <h3>{this.state.dataPelicula.title}</h3>

        <p>
          {this.state.mostrarDescripcion
            ? this.state.dataPelicula.overview
            : `${this.state.dataPelicula.overview.slice(0, 100)}...`}
        </p>

        <button onClick={this.toggleDescripcion}>
          {this.state.mostrarDescripcion
            ? "Ocultar descripción"
            : "Ver descripción"}
        </button>

        <Link to={`/detalle/${this.state.dataPelicula.id}`}>
          <button>Ir a detalle</button>
        </Link>

        {this.state.favorito ? (
          <button
            onClick={() => {
              this.quitarDeFavoritos(this.state.dataPelicula.id);
              if (this.props.onQuitar) {
                this.props.onQuitar();
              }
            }}
          >
            Quitar de favoritos
          </button>
        ) : (
          <button
            onClick={() => this.agregarAFavoritos(this.state.dataPelicula.id)}
          >
            Agregar a favoritos
          </button>
        )}
      </div>
    );
  }
}

export default Tarjeta;
