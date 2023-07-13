const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const apiV1 = require("./src/apis/apiV1");

app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://localhost:5173", "https://lets-find-you-a-movie.vercel.app"],
};
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/moviesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("debug", true);

app.use("/api/v1", apiV1);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
