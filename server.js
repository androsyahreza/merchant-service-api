const router = require("./app/routes/route");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});