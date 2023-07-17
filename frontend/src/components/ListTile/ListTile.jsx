import { Link } from "react-router-dom";
import "./ListTile.css";

function ListTile({ name, imageUrl }) {
  return (
    <div className="list-tile">
      <img src={imageUrl} className="list-tile-image" />
      <h1 className="list-tile-title">{name}</h1>
    </div>
  );
}

export default ListTile;
