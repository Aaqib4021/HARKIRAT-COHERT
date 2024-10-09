const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
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

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.json({
    courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  const user = await User.findOneAndUpdate(
    { username },
    { $push: { purchasedCourses: courseId } },
    { new: true }
  );
  res.json({
    msg: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
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
