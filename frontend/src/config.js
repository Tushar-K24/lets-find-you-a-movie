const imageBaseUrl = "https://image.tmdb.org/t/p/original";
const baseUrl = "https://movies-api-y06l.onrender.com/api/v1";
// const baseUrl = "http://localhost:3000/api/v1";

const placeholderImage =
  "https://us.123rf.com/450wm/lililia/lililia1711/lililia171100531/90663999-vector-flat-icon-of-exclamation-on-black-background.jpg?ver=6";

const carouselUrl = `${baseUrl}/user/movies?sort=popularity&limit=5`;

export { imageBaseUrl, baseUrl, placeholderImage, carouselUrl };
