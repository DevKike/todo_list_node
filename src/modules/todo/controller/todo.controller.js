const { create, update, get, foundToDo, destroy } = require("../service/todo.service");

const createToDo = async (toDo, userId) => {
  try {
    const toDoData = { ...toDo, userId };

    const newToDo = await create(toDoData);

    return newToDo;
  } catch (error) {
    throw error;
  }
};

const updateToDo = async (toDo, toDoId, userId) => {
  try {
    const foundToDo = await foundToDo(toDoId, userId);

    if (!foundToDo) {
      throw new Error("ToDo not found or user not authorized to update");
    }

    const toDoUpdated = await update(toDo, toDoId);

    return toDoUpdated;
  } catch (error) {
    throw error;
  }
};

const getToDoes = async (userId) => {
  try {
    const toDoes = await get(userId);

    return toDoes;
  } catch (error) {
    throw error;
  }
};

const deleteToDo = async (toDoId, userId) => {
  try {
    const foundTodo = await foundToDo(toDoId, userId);

    if (!foundTodo) {
      throw new Error("ToDo not found or user not authorized to update");
    }

    if (foundTodo.dataValues.finish === false) {
      throw new Error("Can't delete a toDo that is not finished");
    }

    const toDoDeleted = await destroy(toDoId, userId);

    return toDoDeleted;
  } catch (error) {
    throw error;
  }
};
module.exports = { createToDo, updateToDo, getToDoes, deleteToDo };
