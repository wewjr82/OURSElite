// controllers/UserController.js

const User = require("../models/User");

exports.filterUsers = async (req, res) => {
  const { industry, state } = req.query;

  try {
    const filteredUsers = await User.find({ industry, state });

    if (filteredUsers.length === 0) {
      // Render a specific view when no users are found
      return res.render("noUsersFound");
    }

    res.render("userList", { users: filteredUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
