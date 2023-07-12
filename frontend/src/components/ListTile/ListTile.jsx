import { Link } from "react-router-dom";
import "./ListTile.css";

function ListTile({ name, imageUrl }) {
  return (
    <Link to={name} className="list-tile">
      <img src={imageUrl} className="list-tile-image" />
      <h1 className="list-tile-title">{name}</h1>
    </Link>
  );
}

export default ListTile;
