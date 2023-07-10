import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MoviesSection from "../../components/MoviesSection/MoviesSection";
import MoviePage from "../../components/MoviePage/MoviePage";
import MyListPage from "../../components/MyList/MyListPage";
import FavouritesPage from "../../components/FavouritesPage/FavouritesPage";
import { useState } from "react";
import { Link } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 2,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 3,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 4,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 5,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 6,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 7,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 8,
    title: "Things to Do in Denver When You're Dead",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
  {
    id: 9,
    title: "Movie 9",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 10,
    title: "Movie 10",
    poster_path: "/oPp6Gbrasox66WyMvPS0k8OakQf.jpg",
  },
];

function Home() {
  //nav bar
  const navTitle = "Let's Find You A Movie";
  const navLinks = [
    <Link to="/home"> Home </Link>,
    <Link to="/home"> Favourites </Link>,
    <Link to="/home"> My List </Link>,
  ];

  return (
    <>
      <div className="home">
        <div className="home-screen">
          <Navbar title={navTitle} links={navLinks} />
          <Carousel />
          <MoviesSection sectionTitle="Latest Release" movies={movies} />
          <MoviesSection sectionTitle="Recommended For You" movies={movies} />
          <Footer />
        </div>

        <div id="home-overlay" />
      </div>
    </>
  );
}

export default Home;
