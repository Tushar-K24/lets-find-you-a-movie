import { useState } from "react";
import "./MovieCard.css";

const baseUrl = "https://image.tmdb.org/t/p/original";

function MovieCard({ movieId, title, imgUrl, setMovieId }) {
  function handleMovieCardClick() {
    setMovieId(movieId);
  }
  return (
    <div className="movie-card">
      <button className="movie-card-btn" onClick={handleMovieCardClick}>
        <img src={baseUrl + imgUrl} alt={title} className="movie-card-image" />
        <p className="movie-card-title">{title}</p>
      </button>
    </div>
  );
}

export default MovieCard;
