const express = require("express");
const zod = require("zod");
const app = express();
const schema = zod.array(zod.number());

app.use(express.json());

app.post("/", (req, res) => {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  res.send({
    response,
  });
  //   const total = kidneys.length;
  //   res.send("you have " + total + " kidneys");
});

app.listen(3000);
