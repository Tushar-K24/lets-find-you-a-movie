import "./AddToList.css";
import ListTile from "../ListTile/ListTile";
import { useContext } from "react";
import { ListContext } from "../../contexts/myListsContext";
import { imageBaseUrl, placeholderImage } from "../../config";

function AddToList({ movieId }) {
  const { lists } = useContext(ListContext);
  return (
    <div className="add-list-popup">
      <h2 className="add-list-title">Add to</h2>
      {lists.map((list) => (
        <ListTile
          key={list._id}
          imageUrl={
            list.imagePath ? imageBaseUrl + list.imagePath : placeholderImage
          }
          name={list.name}
          movieID={movieId}
        />
      ))}
    </div>
  );
}

export default AddToList;
