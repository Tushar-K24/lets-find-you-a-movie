import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import PageLayout from "../PageLayout/PageLayout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { baseUrl } from "../../config";

function ListPage() {
  const { authToken } = useContext(AuthContext);
  const { list } = useParams();
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/lists/${list}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        // console.log(res);
        setListMovies(res.list.movies);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const movieList = listMovies.map((movie) => (
    <MovieCard
      key={movie.id}
      movieId={movie.api_id}
      title={movie.title}
      imgUrl={movie.poster_path}
    />
  ));
  return <PageLayout title={list} movieList={movieList} />;
}

export default ListPage;
