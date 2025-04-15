import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";
import { Redirect } from "react-router-dom";
import Buscador from "../../components/Buscador/Buscador";

class Resultados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      cargando: true,
      error: false,
      redirigir404: false,
    };
  }

  componentDidMount() {
    const query = this.props.match.params.query;
    if (!query) {
      this.setState({ cargando: false, resultados: [] });
      return;
    }

    this.buscarPeliculas(query);
  }

  componentDidUpdate(prevProps) {
    const queryAnterior = prevProps.match.params.query;
    const queryActual = this.props.match.params.query;

    if (queryAnterior !== queryActual) {
      this.setState({ cargando: true, error: false, redirigir404: false });
      this.buscarPeliculas(queryActual);
    }
  }

  buscarPeliculas(query) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDQ3NTA0ZjllODhiZDIzNzhlYmU0OTE2Y2FiMzE4NCIsIm5iZiI6MTc0MjIxMzE1OS4zMDA5OTk5LCJzdWIiOiI2N2Q4MTAyNzMxNTM4ZGU2MDhmMWUzMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTX_q1oWy0cZlL0KzomYbkSDB6x-eGrOcSytRCI2WQQ",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const sinResultados = !data.results || data.results.length === 0;

        this.setState({
          resultados: data.results || [],
          cargando: false,
          redirigir404: sinResultados,
        });
      })
      .catch((err) => {
        console.error("Error al buscar resultados:", err);
        this.setState({ error: true, cargando: false });
      });
  }

  render() {
    const { resultados, cargando, error, redirigir404 } = this.state;
    const query = this.props.match.params.query;

    if (redirigir404) {
      return <Redirect to="/404" />;
    }

    return (
      <div>
        <Buscador history={this.props.history} />
        <h2>Resultados para: "{query}"</h2>
        <div className="tarjetas-container">
          {cargando ? (
            <p>Cargando resultados...</p>
          ) : error ? (
            <p>Ocurrió un error al buscar. Por favor, intentá más tarde.</p>
          ) : resultados.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            resultados.map((pelicula) => (
              <Tarjeta key={pelicula.id} pelicula={pelicula} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Resultados;