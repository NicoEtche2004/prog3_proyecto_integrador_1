import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
    };
  }

  componentDidMount() {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    this.setState({ favoritos: favs });
  }

  eliminarFavorito = (id) => {
    const nuevosFavs = this.state.favoritos.filter((p) => p.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(nuevosFavs));
    sessionStorage.setItem("favoritos", JSON.stringify(nuevosFavs));

    this.setState({ favoritos: nuevosFavs });
  };

  render() {
    const { favoritos } = this.state;

    return (
      <div>
        <h2>Mis favoritos</h2>

        {favoritos.length === 0 ? (
          <p>No tenés películas favoritas todavía.</p>
        ) : (
          favoritos.map((peli) => (
            <div key={peli.id}>
              <Tarjeta pelicula={peli} />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favoritos;