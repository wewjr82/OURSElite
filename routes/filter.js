const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts"); 

// Define route to handle GET requests to /filtered_posts
router.get("/filtered_posts", postsController.filterPosts);

module.exports = router;
