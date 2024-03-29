const express = require("express");
const { createToDo, updateToDo, getToDoes, deleteToDo } = require("./controller/todo.controller");
const authToken = require("../../middleware/authToken.middleware");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const { createToDoSchema, updateToDoSchema } = require("./schema/todo.schema");

const toDoRouter = express.Router();

toDoRouter.post("/create", authToken(), schemaValidator(createToDoSchema), async (req, res) => {
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

toDoRouter.patch("/update/:id", authToken(), schemaValidator(updateToDoSchema), async (req, res) => {
  try {
    const toDoUpdated = await updateToDo(req.body, req.params.id, req.user);

    res.status(200).json({
      message: "ToDo was updated successfully",
      toDoUpdated: new Boolean(toDoUpdated),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});

toDoRouter.get("/", authToken(), async (req, res) => {
  try {
    const toDoes = await getToDoes(req.user);
    
    res.status(200).json({
      message: "ToDoes were obtained successfully",
      toDoes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});

toDoRouter.delete("/delete/:id", authToken(), async (req, res) => {
  try {
    await deleteToDo(req.params.id, req.user);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});

module.exports = toDoRouter;