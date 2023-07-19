const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

require("dotenv").config();

const app = express();

const apiV1 = require("./src/apis/apiV1");

app.use(bodyParser.json());
const corsOptions = {
  origin: ["https://lets-find-you-a-movie.vercel.app"],
};
app.use(cors(corsOptions));

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}/moviesDB`, {
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

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
