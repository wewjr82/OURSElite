const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        //creating new document using comment model, create comment method
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id); //redirect back to same post
    } catch (err) {
      console.log(err);
    }
  },
};
