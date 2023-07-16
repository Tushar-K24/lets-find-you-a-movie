import { useState } from "react";
import { imageBaseUrl } from "../../config";
import "./MovieCard.css";
import MoviePage from "../MovieModal/MovieModal";

function MovieCard({ movieId, title, imgUrl }) {
  const [isMoviePageActive, setIsMoviePageActive] = useState(false);
  const handleMovieCardClick = () => {
    setIsMoviePageActive(true);
    document.querySelector("#home-overlay").classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const handleCloseMovieCardClick = () => {
    setIsMoviePageActive(false);
    document.querySelector("#home-overlay").classList.remove("active");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="movie-card">
        <button className="movie-card-btn" onClick={handleMovieCardClick}>
          <img
            src={imageBaseUrl + imgUrl}
            alt={title}
            className="movie-card-image"
          />
          <p className="movie-card-title">{title}</p>
        </button>
      </div>
      {isMoviePageActive && (
        <MoviePage
          movieId={movieId}
          handleCloseClick={handleCloseMovieCardClick}
        />
      )}
    </>
  );
}

export default MovieCard;
