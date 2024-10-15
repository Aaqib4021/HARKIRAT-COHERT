const express = require("express");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/index");
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`app listening at port ${PORT}`);
});
