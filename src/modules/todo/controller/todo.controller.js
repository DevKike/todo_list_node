const { create, update, get, foundToDo } = require("../service/todo.service");

const createToDo = async (toDo, userId) => {
  try {    
    const toDoData =  {...toDo, userId};

    const newToDo = await create(toDoData);

    return newToDo;
  } catch (error) {
    throw error;
  }
}

const updateToDo = async (toDo, toDoId, userId) => {
  try {
    const foundTodo = await foundToDo(toDoId, userId);

    if(!foundTodo) {
      throw new Error("ToDo not found or user not authorized to update");
    }

    const toDoUpdated = await update(toDo, toDoId);

    return toDoUpdated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getToDoes = async (userId) => {
  try {
    const toDoes = await get(userId);

    return toDoes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = { createToDo, updateToDo, getToDoes };
