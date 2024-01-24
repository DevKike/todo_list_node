const express = require("express");
const sequelize = require("./db/sequelize");
const config = require("./config/config");
const userRouter = require("./modules/user/user.router");
const toDoRouter = require("./modules/todo/todo.router");
const app = express();
const port = config.SERVER.PORT;

app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", toDoRouter);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Server running in port http://localhost:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}); 
