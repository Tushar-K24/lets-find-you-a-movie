import React, { useContext, useEffect, useState } from "react";
import "./Carousel.css";
import { imageBaseUrl, carouselUrl, placeholderImage } from "../../config";
import { ReactComponent as PrevBtn } from "../../assets/prev.svg";
import { ReactComponent as NextBtn } from "../../assets/next.svg";
import MovieModal from "../MovieModal/MovieModal";
import { AuthContext } from "../../contexts/authContext";

function generateGenreString(genreList) {
  let genre = "";
  genreList.forEach((g) => {
    genre += g.name + " | ";
  });
  return genre.substring(0, genre.length - 2);
}

function Carousel() {
  const { authToken } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [isMoviePageActive, setIsMoviePageActive] = useState(false);

  //movie items
  const [title, setTitle] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(placeholderImage);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(carouselUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setMovies(res.movies);
        setCurrentIndex(0);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setTitle(movies[currentIndex].title);
      setBackgroundImage(imageBaseUrl + movies[currentIndex].backdrop_path);
      setGenre(generateGenreString(movies[currentIndex].genre));
    }
  }, [currentIndex]);

  const style = {
    backgroundImage: "url(" + backgroundImage + ")",
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
              <h1>{title}</h1>
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
          movieId={movies[currentIndex].api_id}
          handleCloseClick={handleCloseCarouselClick}
        />
      )}
    </>
  );
}

export default Carousel;
