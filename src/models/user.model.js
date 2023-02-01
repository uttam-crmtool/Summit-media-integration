const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  gmail: {
    type: String,
    unique: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
});

authSchema.pre("findOne", function () {});

authSchema.pre("findOneAndUpdate", function () {});

authSchema.pre("find", function () {});

const Authorization = mongoose.model("Authorization", authSchema);

module.exports = Authorization;
