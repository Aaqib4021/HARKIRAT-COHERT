const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
// Admin Routes

router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const existingAdmin = await Admin.findOne({
    username,
  });
  if (existingAdmin) {
    res.json({
      msg: "admin aleady registered",
    });
  } else {
    const admin = await Admin.create({
      username,
      password,
    });
    res.json({
      msg: "admin created successfully",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  const course = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({
    msg: "Course created successfully",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find();
  res.json({
    courses,
  });
});

module.exports = router;
