import { createContext, useContext, useState } from "react";
import { baseUrl } from "../config";

const ListContext = createContext();

const ListContextProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  const fetchLists = (authToken) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/lists`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setLists(res.lists);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ListContext.Provider
      value={{
        lists: lists,
        setLists: setLists,
        fetchLists: fetchLists,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
