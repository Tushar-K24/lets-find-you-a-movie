const getUser = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res.status(200).json({ message: "User found", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getUser };
