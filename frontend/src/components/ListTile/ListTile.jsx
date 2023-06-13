import { useState } from "react";
import "./ListTile.css";
import MoviesPopup from "../MoviesPopup/MoviesPopup";

function ListTile({ listId, name, imageUrl, setMovieId }) {
  const [isMoviesPopupActive, setIsMoviesPopupActive] = useState(false);
  const handleListClick = () => {
    setIsMoviesPopupActive(true);
  };
  const closeMoviesPage = () => {
    setIsMoviesPopupActive(false);
  };
  return (
    <>
      <div className="list-tile" onClick={handleListClick}>
        <img src={imageUrl} className="list-tile-image" />
        <h1 className="list-tile-title">{name}</h1>
      </div>
      {isMoviesPopupActive && (
        <MoviesPopup
          listId={listId}
          title={name}
          setMovieId={setMovieId}
          closeMoviesPage={closeMoviesPage}
        />
      )}
    </>
  );
}

export default ListTile;
