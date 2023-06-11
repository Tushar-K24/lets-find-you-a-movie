import "./Navbar.css";

function Navbar({ handleMyList }) {
  return (
    <div className="navbar">
      <div className="nav-container">
        <a className="nav-logo" href="/">
          Let's Find You A Movie
        </a>

        <ul className="nav-links">
          <li className="nav-link">
            <p> Home </p>
          </li>
          <li className="nav-link">
            <p> TV Shows </p>
          </li>
          <li className="nav-link">
            <p> Movies </p>
          </li>
          <li className="nav-link">
            <p onClick={handleMyList}> My List </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
