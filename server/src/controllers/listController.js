const List = require("../models/listSchema");
const Movie = require("../models/movieSchema");

const getAllLists = async (req, res) => {
  /*
    returns all lists created by user
    route: /user/lists
  */
  try {
    const user = req.user.user;
    const lists = await List.find({ createdUser: user._id });
    res.status(200).json({ message: "Lists found", lists: lists });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addList = async (req, res) => {
  /*
    adds new list to the user's existing lists
    route: /user/lists
    body: {
            "name": // list name
          }
  */
  try {
    const user = req.user.user;
    const { name } = req.body;
    //check if list already exists
    const existingList = await List.findOne({
      name: name,
      createdUser: user._id,
    });
    if (existingList) {
      res
        .status(405)
        .json({ message: "List already exists", list: existingList });
    }
    const newList = new List({ name: name, createdUser: user._id });
    const list = await newList.save();
    res.status(201).json({ message: "List created successfully", list: list });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getList = async (req, res) => {
  /*
    get list details with the movies present in the list
    route: /user/lists/:listName
  */
  try {
    const user = req.user.user;
    const { listName } = req.params;
    console.log(listName);
    const list = await List.findOne({
      name: listName,
      createdUser: user._id,
    }).populate("movies");
    if (list) {
      res.status(200).json({ message: "List found", list: list });
    } else {
      res.status(404).json({ message: "List Not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteList = async (req, res) => {
  /*
    deletes the list
    route: /user/lists/:listName
  */
  try {
    const user = req.user.user;
    const { listName } = req.params;
    const deletedList = await List.findOneAndDelete({
      name: listName,
      createdUser: user._id,
    });
    if (deletedList) {
      res.status(200).json({ message: "List deleted successfully" });
    } else {
      res.status(404).json({ message: "List does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addMovietoList = async (req, res) => {
  /*
    adds movie to the existing list
    route: /user/lists/:listName/movies
    body: {
            "movieID": // movie ID
          }
  */
  try {
    const user = req.user.user;
    const { listName } = req.params;
    const { movieID } = req.body;
    const movie = await Movie.findOne({ _id: movieID });
    if (movie) {
      const updatedList = await List.findOneAndUpdate(
        { name: listName, createdUser: user._id },
        { $push: movie._id },
        { new: true }
      );
      if (updatedList) {
        res.status(202).json({ message: "Movie added successfully" });
      } else {
        res.status(404).json({ message: "List does not exist" });
      }
    } else {
      res.status(404).json({ message: "Movie does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovieFromList = async (req, res) => {
  /*
    deletes movie from the existing list
    route: /user/lists/:listName/movies/:movieID
  */
  try {
    const user = req.user.user;
    const { listName, movieID } = req.params;
    const movie = await Movie.findOne({ _id: movieID });
    if (movie) {
      const updatedList = await List.findOneAndUpdate(
        { name: listName, createdUser: user._id },
        { $pull: movie._id },
        { new: true }
      );
      if (updatedList) {
        res.status(202).json({ message: "Movie removed successfully" });
      } else {
        res.status(404).json({ message: "List does not exist" });
      }
    } else {
      res.status(404).json({ message: "Movie does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const changeListName = async (req, res) => {
//   try {
//     const { userID, listName } = req.params;
//     const { newListName } = req.body;
//     const updatedList = await List.findByIdAndUpdate(
//       {
//         name: listName,
//         createdUser: userID,
//       },
//       { name: newListName },
//       { new: true }
//     );
//     if (updatedList) {
//       res.status(202).json({ message: "Name changed successfully" });
//     } else {
//       res.status(404).json({ message: "List does not exist" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  getAllLists,
  addList,
  getList,
  deleteList,
  addMovietoList,
  deleteMovieFromList,
};
