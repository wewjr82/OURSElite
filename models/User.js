const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  companyName: { type: String, unique: true },
  owner: { type: String, unique: true },
  industry: {
    type: String,
    enum: [
      "Aerospace",
      "Agriculture",
      "Computer",
      "Education",
      "Electronics",
      "Energy",
      "Food",
      "Healthcare",
      "Hospitality",
      "Manufacturing",
      "Mining",
      "Music",
      "News Media",
      "Pharmaceutical",
      "Telecommunication",
      "Transport",
      "World Wide Web",
    ],
    unique: true,
  },
  state: {
    type: String,
    enum: [
      "AL",
      "AK",
      "AS",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FL",
      "GA",
      "GU",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "ND",
      "MP",
      "OH",
      "OK",
      "OR",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UM",
      "VI",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ],
    unique: true,
  },
  email: { type: String, unique: true },
  about: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
