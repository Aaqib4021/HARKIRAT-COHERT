const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/index");
const { JWT_SECRET } = require("./config");
const { User } = require("./db");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const propertoken = token.split(" ")[1];
    const decoded = jwt.verify(propertoken, JWT_SECRET);

    const { userId } = decoded;
    if (userId) {
      const user = await User.findOne({ _id: userId });
      res.status(200).json({
        name: user.firstname,
        userId,
      });
    } else {
      return res.status(403).json({
        msg: "null",
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: "null",
    });
  }
});

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`app listening at port ${PORT}`);
});
