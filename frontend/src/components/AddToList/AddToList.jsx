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
    <div className="add-list-popup">
      {lists.map((list) => (
        <ListTile key={list.listID} name={list.name} imageUrl={list.imageUrl} />
      ))}
    </div>
  );
}

export default AddToList;
