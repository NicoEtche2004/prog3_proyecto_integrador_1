import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import Buscador from "../../components/Buscador/Buscador";

import "./style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      proximas: [],
      paginaActual: 1,
      filtradas: [],
    };
  }

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ",
      },
    };

  
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Películas populares:", data);
        this.setState({
          peliculas: data.results,
          filtradas: data.results,
          paginaActual: 1,
        });
      });

    
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Próximos estrenos:", data);
        this.setState({ proximas: data.results });
      });
  }

  render() {
    
     if (this.state.peliculas.length === 0) {
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
    
    if (this.state.cargando === 0) {
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
        <div className="categorias">
        <Buscador history={this.props.history} />
          <div className="categoria">
            <h2>Películas populares</h2>
            <div className="tarjetas-container">
              {this.state.peliculas.slice(0, 5).map((elm, idx) => (
                <Tarjeta key={`${elm}-${idx}`} pelicula={elm} />
              ))}
            </div>
            <Link to="/populares">
              <button>Ver más Populares</button>
            </Link>
          </div>

          <div className="categoria">
            <h2>Próximos estrenos</h2>
            <div className="tarjetas-container">
              {this.state.proximas.slice(0, 5).map((elm, idx) => (
                <Tarjeta key={`${elm}-${idx}`} pelicula={elm} />
              ))}
            </div>
            <Link to="/proximas">
              <button>Ver más Estrenos</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
