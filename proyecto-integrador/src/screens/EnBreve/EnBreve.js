import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import "./style.css"; // Asegúrate de importar el archivo CSS adecuado

export default class EnBreve extends Component {
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
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=" +
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

  handleChange(e) {
    this.setState({ filtro: e.target.value });
  }

  render() {
    let peliculasFiltradas = this.state.peliculas.filter((peli) =>
      peli.title.toLowerCase().includes(this.state.filtro.toLowerCase())
    );

    return (
      <>
        <form>
          <input
            type="text"
            placeholder="Filtrar películas por título..."
            value={this.state.filtro}
            onChange={(e) => this.handleChange(e)}
          />
        </form>

        <h2>Próximos Estrenos</h2>

        <div className="tarjetas-container">
          {peliculasFiltradas.map((elm, i) => (
            <Tarjeta key={i} pelicula={elm} />
          ))}
        </div>

        <button onClick={() => this.cargarPeliculas()}>Ver más</button>
      </>
    );
  }
}
