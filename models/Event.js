// models/event.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
  // Add any other fields you need for your events
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
