import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import "./style.css"; 

export default class Populares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      pagina: 1,
      filtro: "",
    };
  }

  componentDidMount() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" +
      this.state.pagina;

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
        let nuevasPeliculas = this.state.peliculas.concat(data.results);
        this.setState({
          peliculas: nuevasPeliculas,
          pagina: this.state.pagina + 1,
        });
      })
      .catch((error) => console.log(error));
  }



  render() {
    let peliculas = this.state.peliculas.filter((peli) =>
      peli.title.toLowerCase().includes(this.state.filtro.toLowerCase())
    );

    return (
      <>
        <h2>Películas Populares</h2>

        <div className="tarjetas-container">
          {peliculas.map((elm, i) => (
            <Tarjeta key={i} pelicula={elm} />
          ))}
        </div>

        <button onClick={() => this.cargarPeliculas()}>Ver más</button>
      </>
    );
  }
}
