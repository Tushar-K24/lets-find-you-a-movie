import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MoviesSection from "../../components/MoviesSection/MoviesSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { ListContext } from "../../contexts/myListsContext";
import { baseUrl } from "../../config";

const defaultSections = [
  {
    title: "Latest Release",
    url: `${baseUrl}/user/movies?sort=latest`,
  },
  {
    title: "Most Popular",
    url: `${baseUrl}/user/movies?sort=popularity`,
  },
  {
    title: "Recommended for you",
    url: `${baseUrl}/user/recommendations`,
  },
];

function Home() {
  const { authToken } = useContext(AuthContext);
  const { fetchLists } = useContext(ListContext);
  const [sections, setSections] = useState(defaultSections);

  const fetchGenres = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/user/genres/top`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const genreList = JSON.parse(result).genreList;
        const genreSections = genreList.map((genre) => {
          return {
            title: genre,
            url: `${baseUrl}/user/recommendations?genre=${genre}`,
          };
        });
        setSections([...sections, ...genreSections]);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    //get user lists
    fetchLists(authToken);
    fetchGenres();
  }, []);

  // console.log(currentUser);
  return (
    <>
      <div className="home">
        <div className="home-screen">
          <Carousel />
          {sections.map((section, i) => (
            <MoviesSection key={i} title={section.title} url={section.url} />
          ))}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
