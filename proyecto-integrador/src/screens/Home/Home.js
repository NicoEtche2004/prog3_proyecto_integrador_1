import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import SearchForm from "../../components/SearchForm/SearchForm";


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

  handleSearch = (query) => {
    const resultados = this.state.peliculas.filter((peli) =>
      peli.title.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filtradas: resultados });
  };

  render() {
    return (
      <>
        <SearchForm onSearch={this.handleSearch} />
        <h2>Películas populares</h2>
        {this.state.filtradas.slice(0, 5).map((elm, idx) => (
          <Tarjeta key={`${elm}-${idx}`} pelicula={elm} />
        ))}
        <Link to="/todas/populares">
          <button>Ver todas</button>
        </Link>

        <h2>Próximos estrenos</h2>
        {this.state.filtradas.slice(0, 5).map((elm, idx) => (
          <Tarjeta key={`${elm}-${idx}`} pelicula={elm} />
        ))}
        <Link to="/todas/proximas">
          <button>Ver todas</button>
        </Link>
      </>
    );
  }
}