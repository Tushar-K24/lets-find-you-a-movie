import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ title, links }) {
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link className="nav-logo" to="/home">
          {title}
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li className="nav-link">{link}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
