import { ReactComponent as Close } from "../../assets/close.svg";
import "./AddToList.css";
import ListTile from "../ListTile/ListTile";

const lists = [
  {
    imageUrl:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    name: "List 1",
    listID: "1",
  },
  {
    imageUrl:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    name: "List 2",
    listID: "2",
  },
  {
    imageUrl:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    name: "List 3",
    listID: "3",
  },
  {
    imageUrl:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    name: "List 4",
    listID: "4",
  },
  {
    imageUrl:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    name: "List 5",
    listID: "5",
  },
];

function AddToList({ movieId, closeMyList }) {
  return (
    <div className="add-list-container">
      <button className="close-btn" onClick={closeMyList}>
        <Close className="close-logo" />
      </button>
      <h1 id="add-list-title">Lists</h1>
      <hr />
      <div className="show-list-container">
        {lists.map((list) => (
          <ListTile
            key={list.listID}
            imageUrl={list.imageUrl}
            name={list.name}
          />
        ))}
      </div>
    </div>
  );
}

export default AddToList;
