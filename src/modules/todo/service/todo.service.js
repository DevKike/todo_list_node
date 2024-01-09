const { models } = require("../../../db/sequelize");
const ToDo = require("../model/todo.model").ToDo;

const create = async (data) => {
  try {
    const toDo = await models.ToDo.create(data);
    
    return toDo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (toDo, toDoId ) => {
  try {

    const updatedToDo = await ToDo.update( {...toDo}, { where: { id: toDoId } });
    
    return updatedToDo;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const foundToDo = async (toDoId, userId) => {
  return await ToDo.findOne({ where: { id: toDoId, userId }})
}

module.exports = { create, update, foundToDo };
