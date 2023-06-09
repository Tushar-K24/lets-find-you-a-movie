import "./MovieModal.css";
import { imageBaseUrl } from "../../config";
import { ReactComponent as Close } from "../../assets/close.svg";
import { IconHeart, IconPlaylistAdd } from "@tabler/icons-react";
import { useState } from "react";

const movie = {
  adult: false,
  backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  belongs_to_collection: null,
  budget: 63000000,
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
  homepage: "http://www.foxmovies.com/movies/fight-club",
  id: 550,
  imdb_id: "tt0137523",
  original_language: "en",
  original_title: "Fight Club",
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
  popularity: 70.038,
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  production_companies: [
    {
      id: 508,
      logo_path: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
      name: "Regency Enterprises",
      origin_country: "US",
    },
    {
      id: 711,
      logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
      name: "Fox 2000 Pictures",
      origin_country: "US",
    },
    {
      id: 20555,
      logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
      name: "Taurus Film",
      origin_country: "DE",
    },
    {
      id: 54051,
      logo_path: null,
      name: "Atman Entertainment",
      origin_country: "",
    },
    {
      id: 54052,
      logo_path: null,
      name: "Knickerbocker Films",
      origin_country: "US",
    },
    {
      id: 4700,
      logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
      name: "The Linson Company",
      origin_country: "US",
    },
    {
      id: 25,
      logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
      name: "20th Century Fox",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "1999-10-15",
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "Mischief. Mayhem. Soap.",
  title: "Fight Club",
  video: false,
  vote_average: 8.434,
  vote_count: 26519,
};

function generateGenreString(genres) {
  let genre = "";
  genres.forEach((g) => {
    genre += g.name + ", ";
  });
  return genre.substring(0, genre.length - 2);
}

function MovieModal({ movieId, handleCloseClick }) {
  //set background image
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const backdropUrl = imageBaseUrl + movie.backdrop_path;
  const style = {
    backgroundImage: "url(" + backdropUrl + ")",
  };

  //extract genre as string
  const genre = generateGenreString(movie.genres);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div className="movie-modal">
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
                fill={isHeartClicked ? "#e50914" : "false"}
                onMouseEnter={open}
                onMouseLeave={close}
                onClick={handleHeartClick}
              />
              <IconPlaylistAdd width={"2rem"} height={"2rem"} />
            </div>
          </div>
        </div>
      </div>
      <h1 id="header-title">Description</h1>
      <div className="movie-modal-content">
        <div className="movie-modal-desc">
          <p>
            <span>{movie.overview}</span>
          </p>
        </div>
        <div className="movie-modal-meta">
          <p>
            Release: <span>{movie.release_date}</span>
          </p>
          <p>
            Genre: <span>{genre}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
