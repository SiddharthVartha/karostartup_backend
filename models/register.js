const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  cityOfCollege: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3],
  },
  referral: {
    type: mongoose.Schema.Types.ObjectId,
    default: "",
  },
  referralLink: {
    type: String,
    default: "",
  },
  noOfReferrals: {
    type: Number,
    default: 0,
  },
  discount: {
    type: String,
    default: "",
  },
});
const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
