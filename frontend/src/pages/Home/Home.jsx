import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MoviesSection from "../../components/MoviesSection/MoviesSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { ListContext } from "../../contexts/myListsContext";
import { baseUrl } from "../../config";

const dummySection = [
  {
    title: "Latest Release",
    url: `${baseUrl}/user/movies?sort=latest`,
  },
  {
    title: "Most Popular",
    url: `${baseUrl}/user/movies?sort=popularity`,
  },
];

function Home() {
  const { authToken } = useContext(AuthContext);
  const { fetchLists } = useContext(ListContext);
  const [sections, setSections] = useState(dummySection);

  const fetchMovies = (url) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    //get user lists
    fetchLists(authToken);
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
