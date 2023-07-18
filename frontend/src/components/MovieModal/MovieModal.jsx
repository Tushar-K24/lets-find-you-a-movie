import "./MovieModal.css";
import { imageBaseUrl } from "../../config";
import { ReactComponent as Close } from "../../assets/close.svg";
import { IconHeart, IconPlaylistAdd } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import AddToList from "../AddToList/AddToList";
import { Popover } from "@mantine/core";
import { AuthContext } from "../../contexts/authContext";
import { baseUrl } from "../../config";

function generateGenreString(genres) {
  let genre = "";
  genres.forEach((g) => {
    genre += g.name + ", ";
  });
  return genre.substring(0, genre.length - 2);
}

function getDate(date) {
  return date.substring(0, 10);
}

function MovieModal({ movieId, handleCloseClick }) {
  const { authToken } = useContext(AuthContext);
  const [movie, setMovie] = useState();
  const [genre, setGenre] = useState([]);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isAddListClicked, setIsAddListClicked] = useState(false);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/movies/${movieId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result).movie;
        setMovie(res.movie);
        setIsHeartClicked(res.isLiked);
        setGenre(generateGenreString(res.movie.genre));
      })
      .catch((error) => console.log("error", error));
  }, [movieId]);

  //set background image
  const backdropUrl = movie ? imageBaseUrl + movie.backdrop_path : "";
  const style = {
    backgroundImage: "url(" + backdropUrl + ")",
  };

  const handleHeartClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      movieID: movieId,
      isLiked: !isHeartClicked,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/favourites`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsHeartClicked(!isHeartClicked);
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddListClick = () => {
    setIsAddListClicked(true);
  };

  const closeListPage = () => {
    setIsAddListClicked(false);
  };

  const popOverOptions = {
    arrowPosition: "side",
    width: 300,
    withinPortal: true,
    position: "right-start",
    withArrow: true,
  };
  return (
    <div className="movie-modal">
      {movie ? (
        <>
          <div style={style} className="movie-modal-header">
            <div className="movie-modal-header-content">
              <button className="close-btn" onClick={handleCloseClick}>
                <Close className="close-logo" />
              </button>
              <div className="movie-modal-header-desc">
                <h1>{movie.title}</h1>
                <p>{movie.tagline}</p>
                <div className="modal-buttons">
                  <IconHeart
                    className={isHeartClicked ? "active-heart" : ""}
                    width={"2rem"}
                    height={"2rem"}
                    fill={isHeartClicked ? "#e50914" : "transparent"}
                    onClick={handleHeartClick}
                  />
                  <Popover {...popOverOptions}>
                    <Popover.Target>
                      <IconPlaylistAdd width={"2rem"} height={"2rem"} />
                    </Popover.Target>
                    <Popover.Dropdown>
                      <AddToList
                        movieId={movieId}
                        closeMyList={closeListPage}
                      />
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <h1 id="header-title">Description</h1>
          <div className="movie-modal-content">
            <div className="movie-modal-desc">
              <p>
                <span>{movie.description}</span>
              </p>
            </div>
            <div className="movie-modal-meta">
              <p>
                Release: <span>{getDate(movie.release_date)}</span>
              </p>
              <p>
                Genre: <span>{genre}</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <h1 className="error-message">404 not found</h1>
      )}
    </div>
  );
}

export default MovieModal;
