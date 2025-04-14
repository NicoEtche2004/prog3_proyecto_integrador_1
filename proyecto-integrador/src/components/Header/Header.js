import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {
  const navItems = [
   
    { path: "/", label: "Home" },
    { path: "/Favoritos", label: "Favoritos" },
    { path: "/populares", label: "Populares" },
    { path: "/proximas", label: "Estenos" },
  ];

  return (
    <header>
      <div> <Link to="/">
        <h1>Digital Cine</h1>
        </Link>
        <nav>
          <ul>
            {navItems.map((elm, idx) => (
              <li key={`${elm.label}-${idx}`}>
                <Link to={elm.path}>{elm.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
