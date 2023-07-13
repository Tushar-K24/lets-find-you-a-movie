const Genre = require("../models/genreSchema");
const { updateOne } = require("../models/listSchema");

const getGenres = async (genres) => {
  try {
    const genreIDs = genres.map((genre) => genre.id);
    //create bulk ops
    bulkOpsArr = genres.map((genre) => {
      return {
        updateOne: {
          filter: { api_id: genre.id },
          update: { $set: { name: genre.name } },
          upsert: true,
        },
      };
    });
    await Genre.bulkWrite(bulkOpsArr);
    const genreList = await Genre.find({ api_id: { $in: genreIDs } });
    if (genreList) {
      return {
        status: 200,
        data: { message: "Genres found", genre: genreList },
      };
    }
    return {
      status: 404,
      data: { message: "Genres not found" },
    };
  } catch (err) {
    return { status: 400, data: { message: err.message } };
  }
};

module.exports = { getGenres };
