import React from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { Switch, Route } from "react-router-dom";

import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import Favoritos from "./screens/Favoritos/Favoritos";
import NotFound from "./screens/NotFound/NotFound";
import Populares from "./screens/Populares/Populares";
import Resultados from "./screens/Resultados/Resultados";
import EnBreve from "./screens/EnBreve/EnBreve";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/detalle/:id" exact={true} component={Detalle} />
        <Route path="/favoritos" exact ={true} component={Favoritos} />
        <Route path="/populares" exact ={true} component={Populares} />
        <Route path="/proximas" exact ={true} component={EnBreve} />        
        <Route path="/resultados/:query" exact={true} component={Resultados} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
