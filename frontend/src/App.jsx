import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeRoute from "./pages/Home/HomeRoute";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route
            path="home/*"
            element={
              <ProtectedRoute>
                <HomeRoute />
              </ProtectedRoute>
            }
          />
          <Route path="" element={<Navigate to="home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
