const express = require("express");
const config = require('./config/config');
const app = express();
const port = config.SERVER.PORT;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});