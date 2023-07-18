import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../config";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [authToken, setAuthToken] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const Logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(undefined);
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${baseUrl}/user`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const jsonRes = JSON.parse(result);
          if (jsonRes.user) {
            setCurrentUser(JSON.parse(result).user);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          Logout();
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken: authToken,
        setAuthToken: setAuthToken,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        isLoading: isLoading,
        Logout: Logout,
      }}
    >
      {isLoading ? <h1>Loading</h1> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
