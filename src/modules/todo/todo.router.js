const express = require("express");
const createToDo = require("./controller/todo.controller");
const authToken = require("../../middleware/authToken.middleware");

const toDoRouter = express.Router();

toDoRouter.post("/create", authToken(), async (req, res) => {
  try {

    const toDoData = await createToDo(req.body, req.user); 

    res.status(201).json({
      message: "ToDo was created successfully",
      toDoData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});

module.exports = toDoRouter;