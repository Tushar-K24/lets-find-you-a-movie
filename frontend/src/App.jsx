import { useState } from "react";
import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
// import Home from "./pages/Home/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // const [currentForm, setCurrentForm] = useState("Login");
  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
    // <>
    //   {isAuthenticated ? (
    //     <Home />
    //   ) : (
    //     <div className="auth-screen">
    //       {currentForm == "Login" ? (
    //         <Login toggleForm={toggleForm} />
    //       ) : (
    //         <Signup toggleForm={toggleForm} />
    //       )}
    //     </div>
    //   )}
    // </>
  );
}

export default App;
