const express = require("express");
const router = express.Router();
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({
    userId,
  });
  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  //   const session = await mongoose.startSession();

  //   session.startTransaction();
  const { to, amount } = req.body;
  const userId = req.userId;

  const account = await Account.findOne({
    userId,
  });

  if (account.balance < amount) {
    // await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient funds ",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    // await session.abortTransaction();
    return res.status(400).json({
      msg: "invalid accouht",
    });
  }
  await Account.updateOne(
    {
      userId,
    },
    { $inc: { balance: -amount } }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    { $inc: { balance: amount } }
  );

  //   await session.commitTransaction();

  res.json({
    msg: "transfer successfull",
  });
});

module.exports = router;
