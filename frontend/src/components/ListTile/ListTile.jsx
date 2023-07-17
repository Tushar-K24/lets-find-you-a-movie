import "./ListTile.css";

function ListTile({ name, imageUrl, handleClick }) {
  return (
    <div className="list-tile" onClick={handleClick}>
      <img src={imageUrl} className="list-tile-image" />
      <h1 className="list-tile-title">{name}</h1>
    </div>
  );
}

export default ListTile;
