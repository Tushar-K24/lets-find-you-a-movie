const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
