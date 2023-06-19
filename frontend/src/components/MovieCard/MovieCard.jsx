import { useState } from "react";
import "./MovieCard.css";
import MoviePage from "../MoviePage/MoviePage";

const baseUrl = "https://image.tmdb.org/t/p/original";

function MovieCard({ movieId, title, imgUrl }) {
  const [isMoviePageActive, setIsMoviePageActive] = useState(false);
  const handleMovieCardClick = () => {
    setIsMoviePageActive(true);
    document.querySelector(".home").classList.add("inactive");
    document.querySelector(".xyz").classList.add("active");
  };

  const handleCloseMovieCardClick = () => {
    setIsMoviePageActive(false);
    document.querySelector(".home").classList.remove("inactive");
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
      <div className="xyz">
        {isMoviePageActive && (
          <MoviePage
            movieId={movieId}
            handleCloseClick={handleCloseMovieCardClick}
          />
        )}
      </div>
    </>
  );
}

export default MovieCard;
