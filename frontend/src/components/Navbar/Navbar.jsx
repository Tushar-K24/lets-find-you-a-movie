import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-container">
        <a className="nav-logo" href="/">
          Let's Find You A Movie
        </a>

        <ul className="nav-links">
          <li className="nav-link">
            <a href="#"> Home </a>
          </li>
          <li className="nav-link">
            <a href="#"> TV Shows </a>
          </li>
          <li className="nav-link">
            <a href="#"> Movies </a>
          </li>
          <li className="nav-link">
            <a href="#"> My List </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
