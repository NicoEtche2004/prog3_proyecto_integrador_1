import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import "./style.css";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelisFavoritas: [],
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem("favoritos");
    if (storage !== null) {
      const ids = JSON.parse(storage);
      let pelisCargadas = [];
  
      ids.map((id) => {
        return fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            pelisCargadas.push(data);
            this.setState({ pelisFavoritas: pelisCargadas });
          });
      });
    }
  }  

  quitarPeliDeVista = (id) => {
    const actualizadas = this.state.pelisFavoritas.filter((p) => p.id !== id);
    this.setState({ pelisFavoritas: actualizadas });
  };

  render() {
    return (
      <div className="favoritos">
        <h2>Mis favoritos</h2>
        {this.state.pelisFavoritas.length === 0 ? (
          <p>No tenés películas favoritas todavía.</p>
        ) : (
          <div className="tarjetas-container">
            {this.state.pelisFavoritas.map((peli) => (
              <Tarjeta
                key={peli.id}
                pelicula={peli}
                onQuitar={() => this.quitarPeliDeVista(peli.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favoritos;