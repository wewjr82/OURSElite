const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, //what post does this comment comes from
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  forum: {
    // Add a reference to the Forum model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
    required: true, // Assuming a comment must belong to a forum
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdAtFormatted: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
