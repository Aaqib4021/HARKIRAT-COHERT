const express = require("express");
const app = express();

const users = [
  {
    name: "aaqib",
    kidneys: [
      {
        heathy: true,
      },
    ],
  },
];


app.get("/", (req, res) => {});

app.listen(3000);
