const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://localhost:27017/Paytm");
  console.log("DB Connected Successfully");
} catch (err) {
  throw new Error(err);
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 6,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
    maxLength: 30,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
