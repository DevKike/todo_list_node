const { models } = require("../../../db/sequelize");
const User = require("../model/user.model").User;

const register = async (data) => {
  try {
    const user = await models.User.create(data);

    return user;
  } catch (error) {
    throw error;
  }
};

const findUserBy = async (user) => {
  try {
    if (user.id) {
      return await User.findByPk(user.id);
    } else {
      return await User.findOne({ where: { ...user } });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (user) => {
  try {
    return await User.update({ ...user }, { where: { id: user.id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { register, findUserBy, update };
