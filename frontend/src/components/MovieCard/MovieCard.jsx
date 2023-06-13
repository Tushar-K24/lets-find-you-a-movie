import { useState } from "react";
import "./MovieCard.css";
import MoviePage from "../MoviePage/MoviePage";

const baseUrl = "https://image.tmdb.org/t/p/original";

function MovieCard({ movieId, title, imgUrl }) {
  const [isMoviePageActive, setIsMoviePageActive] = useState(false);
  const handleMovieCardClick = () => {
    setIsMoviePageActive(true);
    document.body.classList.add("inactive");
  };

  const handleCloseMovieCardClick = () => {
    setIsMoviePageActive(false);
    document.body.classList.remove("inactive");
  };

  return (
    <>
      <div className="movie-card">
        <button className="movie-card-btn" onClick={handleMovieCardClick}>
          <img
            src={baseUrl + imgUrl}
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
