const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forum");

// Define route for rendering the create forum page
router.get("/create", ensureAuthenticated, forumController.getCreateForum);

// Define route for creating a new forum
router.post("/create", ensureAuthenticated, forumController.createForum);

// Define route for viewing a specific forum
router.get("/:id", forumController.getForum);

// Define route for rendering the forums page
router.get("/", forumController.getAllForums);

// Define route for posting comments on a forum
router.post("/:id/comment", ensureAuthenticated, forumController.postComment);

// Like a comment
router.put("/:forumId/likeComment/:id", forumController.likeComment);

// Delete a comment
router.delete("/:forumId/deleteComment/:id", forumController.deleteComment)

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please log in to access this page");
  res.redirect("/login");
}

module.exports = router;
