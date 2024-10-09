const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
// User Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await User.findOne({
    username,
  });
  if (existingUser) {
    res.json({
      msg: "user already exists please use another username",
    });
  } else {
    const user = await User.create({
      username,
      password,
    });
    res.json({
      message: "User created successfully",
    });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      msg: "user not found",
    });
  }
});
router.get("/courses", userMiddleware, async (req, res) => {
  const courses = await Course.find();
  res.json({
    courses,
  });
});
router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.username;
  const user = await User.findOneAndUpdate(
    { username },
    { $push: { purchasedCourses: courseId } },
    { new: true }
  );
  res.json({
    msg: "course purchased succesfully",
  });
});
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({
    username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    purchasedCourses: courses,
  });
});
module.exports = router;
