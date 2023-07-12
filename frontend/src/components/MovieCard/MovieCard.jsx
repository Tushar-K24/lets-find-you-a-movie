import { useState } from "react";
import { imageBaseUrl } from "../../config";
import "./MovieCard.css";
import MoviePage from "../MovieModal/MovieModal";

function MovieCard({ movieId, title, imgUrl }) {
  const [isMoviePageActive, setIsMoviePageActive] = useState(false);
  const handleMovieCardClick = () => {
    setIsMoviePageActive(true);
    // document.querySelector(".home").classList.add("inactive");
    // document.querySelector(".xyz").classList.add("active");
  };

  const handleCloseMovieCardClick = () => {
    setIsMoviePageActive(false);
    // document.querySelector(".home").classList.remove("inactive");
    // document.querySelector(".xyz").classList.remove("active");
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
