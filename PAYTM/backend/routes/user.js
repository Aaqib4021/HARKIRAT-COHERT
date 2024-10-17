const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.json({
      message: "wrong inputs",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken please choose another email",
    });
  }

  const user = await User.create(body);
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "user created successfully",
    token,
  });
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.json({
      message: "wrong inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.status(200).json({
    message: "logged in",
    token,
  });
});

const updatedBody = z.object({
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updatedBody.safeParse(body);

  if (!success) {
    res.json({
      msg: "input are incorrect",
    });
  }

  try {
    const user = await User.updateOne(
      {
        _id: req.userId,
      },
      body
    );

    res.status(200).json({
      msg: "user updated successfully",
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/bulk/", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } },
    ],
  });
  if (users.length === 0) {
    return res.status(403).json({
      msg: "can not find users with this name ",
    });
  }
  const formattedUsers = users.map((user) => ({
    firstname: user.firstname,
    lastname: user.lastname,
    id: user._id,
  }));
  res.status(200).json({
    users: formattedUsers,
  });
});

module.exports = router;
