import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="" element={<Navigate to="home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
