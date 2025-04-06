import React from "react";
import {Link} from 'react-router-dom'


function Header() {
    return (
        <header>
        <nav>
        <img src = '../img/logo.png' alt = ''/>
        <Link to="/"><h1>Home</h1></Link>
        <Link to="/Favoritos"><h1>Favoritos</h1></Link>
        <Link to='/VerTodas'><h1>Ver Todas </h1></Link>
        </nav>
        </header>
    )
}

export default Header