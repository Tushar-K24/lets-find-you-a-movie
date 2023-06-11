import { ReactComponent as Close } from "../../assets/close.svg";
import "./MyListPage.css";
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

function MyListPage({ closeMyList }) {
  return (
    <div className="list-page-container">
      <button className="close-btn" onClick={closeMyList}>
        <Close className="close-logo" />
      </button>
      <h1 id="list-page-title">My Lists</h1>
      <div className="create-list-container">
        <form>
          <input type="text" placeholder="Create new..." />
          <button type="submit">Create</button>
        </form>
      </div>
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

export default MyListPage;
