import "./MyListPage.css";
import ListTile from "../../components/ListTile/ListTile";

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

function MyListPage() {
  return (
    <div className="list-page-container">
      <h1 className="list-page-title">My List</h1>
      <hr />
      <div className="create-list-container">
        <input type="text" placeholder="Create new list" />
        <button type="submit">Create</button>
      </div>
      <div className="show-list-container">
        <h1 className="show-list-title">Lists</h1>

        {lists.map((list) => (
          <ListTile
            key={list.listID}
            id={list.listID}
            imageUrl={list.imageUrl}
            name={list.name}
          />
        ))}
      </div>
    </div>
  );
}

export default MyListPage;
