import "./Navbar.css";

function Navbar({ handleFavourites, handleMyList }) {
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
            <p onClick={handleFavourites}> Favourites </p>
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
