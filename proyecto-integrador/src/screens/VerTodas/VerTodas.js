import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";

// aca hay que desestructurar
export default class VerTodas extends Component {
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

  cargarPeliculas = () => {
    const { tipo } = this.props.match.params;
    const { pagina } = this.state;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ",
      },
    };

    let url = "";
    if (tipo === "populares") {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pagina}`;
    } else if (tipo === "proximas") {
      url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pagina}`;
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => ({
          peliculas: [...prevState.peliculas, ...data.results],
          pagina: prevState.pagina + 1,
        }));
      })
      .catch((error) => console.error(error));
  };

  handleChange = (e) => {
    this.setState({ filtro: e.target.value });
  };

  render() {
    return (
      <>
        <form>
          <input
            type="text"
            placeholder="Filtrar películas por título..."
            value={this.state.filtro}
            onChange={this.handleChange}
          />
        </form>
        <h2>
          Películas{" "}
          {this.props.match.params.tipo === "populares"
            ? "Populares"
            : "Próximos Estrenos"}
        </h2>

        {this.state.peliculas
          .filter((peli) =>
            (peli.title || peli.name || "")
              .toLowerCase()
              .includes(this.state.filtro.toLowerCase())
          )
          .map((elm, idx) => (
            <Tarjeta key={`${idx}-${elm}`} pelicula={elm} />
          ))}

        <button onClick={this.cargarPeliculas}>Ver más</button>
      </>
    );
  }
}