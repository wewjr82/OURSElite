const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a User model
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Assuming there's a Comment model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fixedCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Forum = mongoose.model("Forum", ForumSchema);

module.exports = Forum;
