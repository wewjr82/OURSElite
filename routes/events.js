// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.get("/events", eventController.getEvents);
router.post("/events", eventController.createEvent);
// Add routes for update and delete as needed

module.exports = router;
