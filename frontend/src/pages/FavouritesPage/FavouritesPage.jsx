import { useContext, useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import PageLayout from "../PageLayout/PageLayout";
import { AuthContext } from "../../contexts/authContext";
import { baseUrl } from "../../config";

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/favourites`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.likedMovies) {
          setFavourites(res.likedMovies);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const movieList = favourites.map((movie) => (
    <MovieCard
      key={movie.api_id}
      movieId={movie.api_id}
      title={movie.title}
      imgUrl={movie.poster_path}
      setMovieId={() => {}}
    />
  ));
  return <PageLayout title={"Favourites"} movieList={movieList} />;
}

export default FavouritesPage;
