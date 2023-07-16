import { Link } from "react-router-dom";
import "./ListTile.css";

function ListTile({ name, imageUrl }) {
  return (
    <Link className="list-tile" to={name}>
      <img src={imageUrl} className="list-tile-image" />
      <h1 className="list-tile-title">{name}</h1>
    </Link>
  );
}

export default ListTile;
