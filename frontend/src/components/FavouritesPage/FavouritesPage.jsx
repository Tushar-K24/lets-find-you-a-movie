import MoviesPopup from "../MoviesPopup/MoviesPopup";
import "./FavouritesPage.css";

const favouritesId = "";
function FavouritesPage({ setMovieId, closeFavouritesPage }) {
  return (
    <MoviesPopup
      listId={favouritesId}
      title={"Favourites"}
      setMovieId={setMovieId}
      closeMoviesPage={closeFavouritesPage}
    />
  );
}

export default FavouritesPage;
