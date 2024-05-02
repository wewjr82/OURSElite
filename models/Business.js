const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profileLink: {
    type: String,
    required: true,
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
