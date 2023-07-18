import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import FavouritesPage from "../FavouritesPage/FavouritesPage";
import MyListPage from "../MyList/MyListPage";
import Navbar from "../../components/Navbar/Navbar";
import ListPage from "../ListPage/ListPage";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function HomeRoute() {
  const { Logout } = useContext(AuthContext);
  const navTitle = "Let's Find You A Movie";
  const navLinks = [
    <Link to="/home"> Home </Link>,
    <Link to="favourites"> Favourites </Link>,
    <Link to="lists"> My List </Link>,
    <Link onClick={Logout}>Logout</Link>,
  ];

  return (
    <>
      <Navbar title={navTitle} links={navLinks} />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="lists/*">
          <Route path="" element={<MyListPage />} />
          <Route path=":list" element={<ListPage />} />
        </Route>
      </Routes>
      <div id="home-overlay" />
    </>
  );
}

export default HomeRoute;
