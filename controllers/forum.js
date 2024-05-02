// Import necessary models
const Forum = require("../models/Forum");
const Comment = require("../models/Comment"); // Adjust the path as needed

// Forum Controller methods
exports.getCreateForum = (req, res) => {
  res.render("create_forum");
};

exports.createForum = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { title, description } = req.body;
    const userId = req.user._id; // Assuming you have user authentication and userId is available in the request

    // Create a new forum object
    const newForum = new Forum({
      title,
      description,
      createdBy: userId,
      createdAtFormatted: new Date().toLocaleString(), // Format the current date and time
    });

    // Save the new forum to the database
    await newForum.save();

    // Redirect the user to the newly created forum page
    res.redirect(`/forums/${newForum._id}`);
  } catch (err) {
    // If an error occurs, log the error and render an error page
    console.error(err);
    res.render("error", { error: err });
  }
};

exports.getForum = async (req, res) => {
  try {
    const forumId = req.params.id;
    const forum = await Forum.findById(forumId)
      .populate({
        path: "comments", //This tells .populate to look for the "comments" field within the forum document.
        populate: {
          //This is another level of population, digging deeper into the comments.
          path: "user", // This tells .populate to look for the "user" field within the comments document.
          select: "owner companyName",
        },
      })
      .populate("comments.likes");

    if (!forum) {
      return res.render("error", { error: "Forum not found" });
    }

    // Pass the forum object and createdAt field to the view
    res.render("forum", {
      forum,
      req,
    });
  } catch (err) {
    console.error(err);
    res.render("error", { error: err });
  }
};

exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find().populate({
      path: "createdBy",
      select: "owner createdAt", // Select only the 'owner' and 'createdAt' fields from the createdBy user
    });

    res.render("forums", { forums }); // Pass the forums variable to the template
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.postComment = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { comment } = req.body;
    const forumId = req.params.id;
    const userId = req.user._id;

    // Find the forum by its ID
    const forum = await Forum.findById(forumId);

    if (!forum) {
      return res.render("error", { error: "Forum not found", status: 404 });
    }

    // Create a new comment
    const newComment = new Comment({
      comment: comment,
      user: userId,
      forum: forum._id,
      likes: 0,
      createdAtFormatted: new Date().toLocaleString(),
    });

    // Save the new comment to the database
    await newComment.save();

    // Push the ObjectId of the new comment into the comments array of the forum
    forum.comments.push(newComment._id);
    await forum.save();

    // Redirect back to the forum page after posting the comment
    res.redirect(`/forums/${forumId}`);
  } catch (err) {
    console.error(err);
    res.render("error", { error: err });
  }
};

exports.likeComment = async (req, res) => {
  try {
    // Find the comment by its ID
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Increment the likes count by 1
    comment.likes += 1;

    // Save the updated comment
    await comment.save();

    console.log("Like added to comment:", commentId);

    // Redirect back to the forum page after liking the comment
    res.redirect(`/forums/${req.params.forumId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    // Extract forum and comment IDs from the request parameters
    const forumId = req.params.forumId;
    const commentId = req.params.id;

    // Find the comment by its ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      // If the comment is not found, return an error
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
    if (String(comment.user) !== String(req.user._id)) {
      // If not, return an error indicating unauthorized access
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Find the forum and remove the comment ID from its comments array
    const updatedForum = await Forum.findByIdAndUpdate(
      forumId,
      { $pull: { comments: commentId } },
      { new: true } // Return the modified document
    );

    if (!updatedForum) {
      // If the forum is not found, return an error
      return res.status(404).json({ error: "Forum not found" });
    }

    // Delete the comment itself
    await comment.remove();

    console.log("Comment Deleted");

    // Redirect back to the forum page after deleting the comment
    res.redirect(`/forums/${forumId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
