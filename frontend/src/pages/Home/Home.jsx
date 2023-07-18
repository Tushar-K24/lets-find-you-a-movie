import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MoviesSection from "../../components/MoviesSection/MoviesSection";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

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
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  //movie section
  const movieCardList = movies.map((movie) => (
    <MovieCard
      key={movie.id}
      movieId={movie.id}
      title={movie.title}
      imgUrl={movie.poster_path}
    />
  ));

  return (
    <>
      <div className="home">
        <div className="home-screen">
          <Carousel />
          <MoviesSection
            sectionTitle="Latest Release"
            sectionItems={movieCardList}
          />
          <MoviesSection
            sectionTitle="Recommended For You"
            sectionItems={movieCardList}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
