import React, { Component } from "react";
import "./style.css";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit">Buscar</button>
      </form>
    );
  }
}