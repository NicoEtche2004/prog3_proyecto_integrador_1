import React, { Component } from "react";

export default class FormularioFiltro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorInput: ""
    };
  }

  manejarSubmit(evento) {
    evento.preventDefault();
  }

  controlarInput(evento) {
    this.setState(
      { valorInput: evento.target.value },
      () => this.props.filtro(this.state.valorInput)
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={(evento) => this.manejarSubmit(evento)}>
          <input
            type="text"
            onChange={(evento) => this.controlarInput(evento)}
            value={this.state.valorInput}
            placeholder="Filtrar..."
          />
        </form>
      </div>
    );
  }
}
