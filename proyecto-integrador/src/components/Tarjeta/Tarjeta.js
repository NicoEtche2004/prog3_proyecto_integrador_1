import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Tarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      favorito: false,
    };


  }

 Descripcion = () => {
  const nuevoEstado = !this.state.mostrarDescripcion;
  this.setState({ mostrarDescripcion: nuevoEstado });
};


Favorito = () => {
  this.setState((prevState) => ({
    favorito: !prevState.favorito
  }));
};


  render() {
    const { pelicula } = this.props;
    const { mostrarDescripcion, favorito } = this.state;

    return (
      <div className="tarjeta">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
          width="200"
          height="300"
        />

        <h3>{pelicula.title}</h3>

        <p>
          {mostrarDescripcion
            ? pelicula.overview
            : `${pelicula.overview.slice(0, 100)}...`}
        </p>

        <button onClick={this.Descripcion}>
          {mostrarDescripcion ? "Ocultar descripción" : "Ver descripción"}
        </button>

        
        <Link to={`/detalle/${pelicula.id}`}>
          <button>Ir a detalle</button>
        </Link>

        
        <button onClick={this.Favorito}>
          {favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default Tarjeta;
