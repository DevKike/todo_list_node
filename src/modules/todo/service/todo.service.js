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

module.exports = create;
