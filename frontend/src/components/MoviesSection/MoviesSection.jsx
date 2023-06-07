import { useState } from "react";
import "./MoviesSection.css";
import MovieCard from "../MovieCard/MovieCard";
import { ReactComponent as PrevBtn } from "../../assets/prev.svg";
import { ReactComponent as NextBtn } from "../../assets/next.svg";

function MoviesSection({ sectionTitle, movies, setMovieId }) {
  //offset for the movie cards displayed
  const [offset, setOffset] = useState(0);
  const nextSlide = () => {
    setOffset((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setOffset((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  //set when the section row is hovered over (to display slider buttons)
  const [isRowHovered, setIsRowHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsRowHovered(true);
  };

  const handleMouseLeave = () => {
    setIsRowHovered(false);
  };

  const numCardsPerPage = 8;
  const cardEndIndex = Math.min((offset + 1) * numCardsPerPage, movies.length);
  const cardStartIndex = cardEndIndex - numCardsPerPage;

  return (
    <div className="movies-section">
      <h1 className="section-title">{sectionTitle}</h1>
      <div
        className="section-row"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {movies.slice(cardStartIndex, cardEndIndex).map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            imgUrl={movie.poster_path}
            setMovieId={setMovieId}
          />
        ))}
        <button
          className={`section-btn ${
            isRowHovered && cardStartIndex > 0 ? "" : "hidden"
          }`}
          id="btn-left"
          onClick={prevSlide}
        >
          <PrevBtn fill="rgb(255,255,255,0.8)" />
        </button>
        <button
          className={`section-btn ${
            isRowHovered && cardEndIndex < movies.length ? "" : "hidden"
          }`}
          id="btn-right"
          onClick={nextSlide}
        >
          <NextBtn fill="rgb(255,255,255,0.8)" />
        </button>
      </div>
    </div>
  );
}

export default MoviesSection;
