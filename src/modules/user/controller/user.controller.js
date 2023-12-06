const UserModel = require("../model/user.model");
const UserSchema = require("../schema/user.schema");

const createUser = (user) => {
  try {
    console.log('user: ', user);
    const newUser = new UserModel(user.name, user.last_name, user.email, user.password);
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = createUser;
