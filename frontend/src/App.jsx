import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [currentForm, setCurrentForm] = useState("Login");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <>
      {isAuthenticated ? (
        <Home />
      ) : (
        <div className="auth-screen">
          {currentForm == "Login" ? (
            <Login toggleForm={toggleForm} />
          ) : (
            <Signup toggleForm={toggleForm} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
