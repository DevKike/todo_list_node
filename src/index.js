const express = require("express");
const config = require("./config/config");
const userRouter = require("./modules/user/user.router");
const app = express();
const port = config.SERVER.PORT;

app.use(express.json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
