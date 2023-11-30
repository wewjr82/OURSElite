const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
//using id of post we are on
router.post("/createComment/:id", commentsController.createComment);

module.exports = router;
