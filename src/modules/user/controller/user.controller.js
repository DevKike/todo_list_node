const { create } = require("../service/user.service");
const { hash } = require("../../../util/bcrypt");

const createUser = async (user) => {
  try {
    const password = hash(user.password);
    const newUser = await create({ ...user, password });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
