const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/harkiratprep");

const User = mongoose.model("user", {
  name: String,
  username: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send("username already present");
  }
  const user = await User.create({ name, username, password });
  res.send("created user");
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await User.findOne({ username });
  if (!findUser) {
    return res.status(401).json({
      msg: "user not found",
    });
  }
  const token = jwt.sign({ username }, "secret");
  return res.json({
    token,
  });
});

app.get("/users", async (req, res) => {
  const username = req.headers.authorization;
  const decoded = jwt.verify(username, "secret");
  if (!decoded) {
    return res.json({
      msg: "invalid token",
    });
  }
  const users = await User.find();
  res.json({
    users,
  });
});

app.listen(3000);
