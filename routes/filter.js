// routes/filter.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users"); // Corrected case

router.get("/filter", UserController.filterUsers);

module.exports = router;
