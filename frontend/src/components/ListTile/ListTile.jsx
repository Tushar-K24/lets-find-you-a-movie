import { useContext } from "react";
import "./ListTile.css";
import { AuthContext } from "../../contexts/authContext";
import { baseUrl } from "../../config";

function ListTile({ name, imageUrl, movieID }) {
  const { authToken } = useContext(AuthContext);

  const addMovieToList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      movieID: movieID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/lists/${name}/movies`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const handleClick = movieID ? addMovieToList : () => {};

  return (
    <div className="list-tile" onClick={handleClick}>
      <img src={imageUrl} className="list-tile-image" />
      <h1 className="list-tile-title">{name}</h1>
    </div>
  );
}

export default ListTile;
