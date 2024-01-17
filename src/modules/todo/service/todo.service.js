const { models } = require("../../../db/sequelize");

const create = async (data) => {
  try {
    const toDo = await models.ToDo.create(data);
    
    return toDo;
  } catch (error) {
    throw error;
  }
};

const update = async (toDo, toDoId ) => {
  try {
    const updatedToDo = await models.ToDo.update( {...toDo}, { where: { id: toDoId } });
    
    return updatedToDo;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const get = async (userId) => {
  try {
    return await models.ToDo.findAll({ where: {userId} });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const foundToDo = async (toDoId, userId) => {
  return await models.ToDo.findOne({ where: { id: toDoId, userId }})
}

module.exports = { create, update, get, foundToDo };
