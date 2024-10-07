//hashing
//Encryption
//JWT
//Local Storage
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ALL_USERS = [
  {
    username: "aaqib",
    password: "hey123",
    gender: "male",
    address: "prichoo",
  },
  {
    username: "yawar",
    password: "hey111",
    gender: "male",
    address: "sgr",
  },
  {
    username: "wajeeha",
    password: "hey222",
    gender: "male",
    address: "mandipora",
  },
  {
    username: "waheeba",
    password: "hey333",
    gender: "male",
    address: "pulwama",
  },
];

function userExist(username, password) {
  return ALL_USERS.find(
    (user) => username === user.username && password === user.password
  );
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExist(username, password)) {
    return res.status(203).json({
      msg: "user does not exist",
    });
  }
  let token = jwt.sign({ username }, "secret");
  return res.json({
    token,
  });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, "secret");
    res.json({
      ALL_USERS,
    });
  } catch (error) {
    return res.send("invalid token");
  }
});
app.listen(3000);
