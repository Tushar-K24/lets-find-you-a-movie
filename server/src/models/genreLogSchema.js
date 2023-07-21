const mongoose = require("mongoose");

const genreLogSchema = new mongoose.Schema(
  {
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const GenreLog = mongoose.model("GenreLog", genreLogSchema);

module.exports = GenreLog;
