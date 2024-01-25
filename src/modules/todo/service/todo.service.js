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

const update = async (toDo, toDoId) => {
  try {
    const updatedToDo = await ToDo.update(
      { ...toDo },
      { where: { id: toDoId } }
    );

    return updatedToDo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const get = async (userId) => {
  try {
    return await ToDo.findAll({ where: { userId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const foundToDo = async (toDoId, userId) => {
  try {
    return await ToDo.findOne({ where: { id: toDoId, userId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const destroy = async (toDoId, userId) => {
  try {
    return await ToDo.destroy({ where: { id: toDoId, userId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { create, update, get, foundToDo, destroy };
