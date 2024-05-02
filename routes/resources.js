const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource");

// Route for rendering the create resource form
router.get("/create", resourceController.getCreateResource);

// Route for creating a new resource
router.post("/", resourceController.createResource);

// Route for displaying resources
router.get("/", resourceController.getResources); // Add this line to handle GET request to "/resources"

module.exports = router;
