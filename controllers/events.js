// controllers/eventController.js
const Event = require("../models/Event");

// Controller actions
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { title, start, end } = req.body;
    const event = new Event({ title, start, end });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

// Add update and delete actions as needed
