import { useContext, useEffect, useState } from "react";
import "./MoviesSection.css";
import { AuthContext } from "../../contexts/authContext";
import SectionRow from "../Row/SectionRow";
import MovieCard from "../../components/MovieCard/MovieCard";

function MoviesSection({ title, url }) {
  const { authToken } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.movies) {
          setMovies(res.movies);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  //movie section
  const movieCardList = movies.map((movie) => (
    <MovieCard
      key={movie.api_id}
      movieId={movie.api_id}
      title={movie.title}
      imgUrl={movie.poster_path}
    />
  ));

  //set when the section row is hovered over (to display slider buttons)
  const [isRowHovered, setIsRowHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsRowHovered(true);
  };

  const handleMouseLeave = () => {
    setIsRowHovered(false);
  };

  return (
    <>
      {movies.length > 0 && (
        <div
          className="movies-section"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="section-title">{title}</h1>
          <SectionRow
            isRowHovered={isRowHovered}
            sectionItems={movieCardList}
          />
        </div>
      )}
    </>
  );
}

export default MoviesSection;
