const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World~");
});

app.post("/conversation", (req, res) => {
  console.log(req.body);
  res.send("working on post");
});

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
