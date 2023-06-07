import React, { useState } from "react";
import "./Carousel.css";
import { ReactComponent as PrevBtn } from "../../assets/prev.svg";
import { ReactComponent as NextBtn } from "../../assets/next.svg";

const baseUrl = "https://image.tmdb.org/t/p/original";
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

function Carousel({ setMovieId }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  let genre = "";
  movies[currentIndex].genres.forEach((g) => {
    genre += g.name + " | ";
  });

  genre = genre.substring(0, genre.length - 2);

  const style = {
    backgroundImage:
      "url(" + baseUrl + movies[currentIndex].backdrop_path + ")",
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

  function handleCarouselClick() {
    setMovieId(movies[currentIndex].id);
  }

  return (
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
  );
}

export default Carousel;
