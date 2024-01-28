const express = require("express");
const userRouter = require("../modules/user/user.router");
const toDoRouter = require("../modules/todo/todo.router");
const app = express();


app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", toDoRouter);

module.exports = app;