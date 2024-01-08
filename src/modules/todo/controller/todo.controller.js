const create = require("../service/todo.service");

const createToDo = async (toDo, userId) => {
  try {    
    const toDoData =  { ...toDo, userId};

    const newToDo = await create(toDoData);

    return newToDo;
  } catch (error) {
    throw error;
  }
};

module.exports = createToDo;
