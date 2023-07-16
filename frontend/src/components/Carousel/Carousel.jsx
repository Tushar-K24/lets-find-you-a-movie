import React, { useState } from "react";
import "./Carousel.css";
import { imageBaseUrl } from "../../config";
import { ReactComponent as PrevBtn } from "../../assets/prev.svg";
import { ReactComponent as NextBtn } from "../../assets/next.svg";
import MovieModal from "../MovieModal/MovieModal";

const movies = [
  {
    id: 550,
    title: "Fight Club",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    genres: [
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 35,
        name: "Comedy",
      },
    ],
  },
  {
    id: 400,
    title: "Things to Do in Denver When You're Dead",
    backdrop_path: "/7fEOKdQIfbkOxy0enLtpyPGUsTm.jpg",
    genres: [
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 80,
        name: "Crime",
      },
    ],
  },
];

function generateGenreString(genreList) {
  let genre = "";
  genreList.forEach((g) => {
    genre += g.name + " | ";
  });
  return genre.substring(0, genre.length - 2);
}

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoviePageActive, setIsMoviePageActive] = useState(false);

  let genre = generateGenreString(movies[currentIndex].genres);
  const backdropUrl = imageBaseUrl + movies[currentIndex].backdrop_path;

  const style = {
    backgroundImage: "url(" + backdropUrl + ")",
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleCarouselClick = () => {
    setIsMoviePageActive(true);
    document.querySelector("#home-overlay").classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const handleCloseCarouselClick = () => {
    setIsMoviePageActive(false);
    document.querySelector("#home-overlay").classList.remove("active");
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <div style={style} className="carousel">
        <div className="carousel-container">
          <button className="carousel-button" onClick={prevSlide}>
            <PrevBtn fill="rgb(255,255,255,0.8)" />
          </button>
          <div onClick={handleCarouselClick} className="carousel-content">
            <div className="carousel-desc">
              <h1>{movies[currentIndex].title}</h1>
              <p>{genre}</p>
            </div>
          </div>
          <button className="carousel-button" onClick={nextSlide}>
            <NextBtn fill="rgb(255,255,255,0.8)" />
          </button>
        </div>
        <div style={style} className="carousel-blurred-image" />
      </div>
      {isMoviePageActive && (
        <MovieModal
          movieId={movies[currentIndex].id}
          handleCloseClick={handleCloseCarouselClick}
        />
      )}
    </>
  );
}

export default Carousel;
