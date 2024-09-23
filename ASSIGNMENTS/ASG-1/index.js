const express = require("express");
const app = express();
const fs = require("fs");

app.get("/files", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.json(files);
  });
});

app.get("/files/:filename", (req, res) => {
  let filename = req.params.filename;
  fs.readFile("./files/" + filename, "utf-8", (err, data) => {
    if (err) {
      res.status(404).send("File not found");
    } else {
      res.json({
        content: data,
      });
    }
  });
});

app.listen(3000);
