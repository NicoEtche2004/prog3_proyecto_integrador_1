import React from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { Switch, Route } from "react-router-dom";

import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
// import Favoritos from "./screens/Favoritos/Favoritos";
import NotFound from "./screens/NotFound/NotFound";
// import VerTodas from './screens/VerTodas/VerTodas';
// import Resultados from "./screens/Resultados/Resultados";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/detalle/:id" exact={true} component={Detalle} />
        <Route path="" exact={true} component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
