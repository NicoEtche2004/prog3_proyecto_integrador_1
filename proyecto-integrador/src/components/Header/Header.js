import { Link } from "react-router-dom";

export default function Header() {
  const navItems = [
    { path: "/", label: "Digital Cine" },
    { path: "/", label: "Home" },
    { path: "/Favoritos", label: "Favoritos" },
    { path: "/todas/populares", label: "Populares" },
    { path: "/todas/proximas", label: "Por venir" },
  ];
  // aca cambie
  return (
    <header>
      <div>
        <h1>MiAplicación</h1>
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