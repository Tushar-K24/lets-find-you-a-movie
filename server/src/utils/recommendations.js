const cfg = require("../config");
const axios = require("axios");

const getRecommendationService = async (latestInteractions, genre) => {
  try {
    const dataObj = {
      movies: latestInteractions.map((interaction) => interaction.movieData),
    };
    const data = JSON.stringify(dataObj);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${cfg.flaskBaseUrl}/recommendations/${genre}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return { status: 200, data: response.data };
  } catch (err) {
    return { status: 400, data: { message: err.message } };
  }
};

module.exports = { getRecommendationService };
