import "./MyListPage.css";
import ListTile from "../../components/ListTile/ListTile";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { imageBaseUrl, baseUrl, placeholderImage } from "../../config";
import { ListContext } from "../../contexts/myListsContext";

function MyListPage() {
  const { authToken } = useContext(AuthContext);
  const { lists, fetchLists } = useContext(ListContext);
  const [listName, setListName] = useState("");

  useEffect(() => {
    if (lists.length === 0) {
      fetchLists(authToken);
    }
  }, []);

  const addList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      name: listName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/lists`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        fetchLists(authToken);
      })
      .catch((error) => console.log("error", error));
    setListName("");
  };

  return (
    <div className="list-page-container">
      <h1 className="list-page-title">My List</h1>
      <hr />
      <div className="create-list-container">
        <input
          type="text"
          id="list-name"
          name="list-name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Create new list"
        />
        <button type="submit" onClick={addList}>
          Create
        </button>
      </div>
      <div className="show-list-container">
        <h1 className="show-list-title">Lists</h1>

        {lists.map((list) => (
          <Link key={list._id} className="list-link" to={list.name}>
            <ListTile
              imageUrl={
                list.imagePath
                  ? imageBaseUrl + list.imagePath
                  : placeholderImage
              }
              name={list.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyListPage;
