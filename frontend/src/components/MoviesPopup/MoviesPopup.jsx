import { ReactComponent as Close } from "../../assets/close.svg";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesPopup.css";

const movies = [
  {
    id: 1,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 2,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 3,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 4,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 5,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 6,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 7,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 8,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 9,
    title: "Movie 9",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 10,
    title: "Movie 10",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
];

function MoviesPopup({ listId, title, setMovieId, closeMoviesPage }) {
  return (
    <div className="movies-page-container">
      <button className="close-btn" onClick={closeMoviesPage}>
        <Close className="close-logo" />
      </button>
      <h1 className="movies-page-title">{title}</h1>
      <hr />
      <div className="movies-page-content">
        <div className="movies-content">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              imgUrl={movie.poster_path}
              setMovieId={setMovieId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesPopup;
