// src/components/Peliculas/Tarjeta.js
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Tarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      favorito: false,
    };
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const esFavorito = favoritos.some((p) => p.id === this.props.pelicula.id);
    this.state.favorito = esFavorito;
  }

  Descripcion = () => {
    this.setState(function (prevState) {
      return {
        mostrarDescripcion: !prevState.mostrarDescripcion,
      };
    });
  };

  Favorito = () => {
    const pelicula = this.props.pelicula;

    let favsLocal = JSON.parse(localStorage.getItem("favoritos")) || [];
    let favsSession = JSON.parse(sessionStorage.getItem("favoritos")) || [];

    let esFavorito = this.state.favorito;

    if (esFavorito) {
      favsLocal = favsLocal.filter((p) => p.id !== pelicula.id);
      favsSession = favsSession.filter((p) => p.id !== pelicula.id);
    } else {
      favsLocal.push(pelicula);
      favsSession.push(pelicula);
    }

    localStorage.setItem("favoritos", JSON.stringify(favsLocal));
    sessionStorage.setItem("favoritos", JSON.stringify(favsSession));

    this.setState({ favorito: !esFavorito });
  };

  render() {
    return (
      <div className="tarjeta">
        <img
          src={`https://image.tmdb.org/t/p/w500${this.props.pelicula.poster_path}`}
          alt={this.props.pelicula.title}
          width="200"
          height="300"
        />

        <h3>{this.props.pelicula.title}</h3>

        <p>
          {this.state.mostrarDescripcion
            ? this.props.pelicula.overview
            : this.props.pelicula.overview.slice(0, 100) + "..."}
        </p>

        <button onClick={this.Descripcion}>
          {this.state.mostrarDescripcion
            ? "Ocultar descripción"
            : "Ver descripción"}
        </button>

        {/* Enlace al detalle de la película */}
        <Link to={`/detalle/${this.props.pelicula.id}`}>
          <button>Ir a detalle</button>
        </Link>

        {/* Botón de agregar/quitar de favoritos */}
        <button onClick={this.Favorito}>
          {this.state.favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default Tarjeta;