const User = require("../models/userSchema");
const List = require("../models/listSchema");

const addList = async (req, res) => {
  try {
    const { userID, listName } = req.params;
    //check if list already exists
    const existingList = await List.findOne({
      name: listName,
      createdUser: userID,
    });
    if (existingList) {
      res
        .status(405)
        .json({ message: "List already exists", list: existingList._id });
    }
    const newList = new List({ name: listName, createdUser: userID });
    const list = await newList.save();
    res
      .status(201)
      .json({ message: "List created successfully", list: list._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addMovietoList = async (req, res) => {
  try {
    const { userID, listName } = req.params;
    const { movie } = req.body; //movieID
    const updatedList = await List.findOneAndUpdate(
      { name: listName, createdUser: userID },
      { $push: movie },
      { new: true }
    );
    if (updatedList) {
      res.status(202).json({ message: "Movie added successfully" });
    } else {
      res.status(404).json({ message: "List does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const changeListName = async (req, res) => {
  try {
    const { userID, listName } = req.params;
    const { newListName } = req.body;
    const updatedList = await List.findByIdAndUpdate(
      {
        name: listName,
        createdUser: userID,
      },
      { name: newListName },
      { new: true }
    );
    if (updatedList) {
      res.status(202).json({ message: "Name changed successfully" });
    } else {
      res.status(404).json({ message: "List does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteList = async (req, res) => {
  try {
    const { userID, listName } = req.params;
    await List.findOneAndDelete({ name: listName, createdUser: userID });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addList, addMovietoList, changeListName, deleteList };
