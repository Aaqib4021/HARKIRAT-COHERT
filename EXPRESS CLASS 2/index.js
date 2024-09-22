const express = require("express");
const app = express();

const users = [
  {
    name: "aaqib",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: true,
      },
      {
        healthy: true,
      },
      {
        healthy: true,
      },
      {
        healthy: true,
      },

      {
        healthy: false,
      },

      {
        healthy: false,
      },

      {
        healthy: false,
      },
    ],
  },
];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let numberOfKidneys = users[0].kidneys.length;
  let numberOfHealthyKidneys = () => {
    return users[0].kidneys.filter((user) => {
      return user.healthy === true;
    });
  };
  let numberOfUnhealthyKidneys =
    numberOfKidneys - numberOfHealthyKidneys().length;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys: numberOfHealthyKidneys().length,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({ healthy: ishealthy });
  res.status(200).send("hey");
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "done!",
  });
});

app.delete("/", (req, res) => {
  const healthyKidneys = () => {
    return users[0].kidneys.filter((user) => {
      return user.healthy === true;
    });
  };
  users[0].kidneys = healthyKidneys();
  res.json({
    msg: "done",
  });
});

app.listen(3000);
