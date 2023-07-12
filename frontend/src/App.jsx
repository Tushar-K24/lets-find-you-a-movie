import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeRoute from "./pages/Home/HomeRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="home/*" element={<HomeRoute />} />
          <Route path="" element={<Navigate to="home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
