const { create } = require("../service/user.service");
const { hash } = require("../../../util/bcrypt");
const User = require("../model/user.model").User;

const registerUser = async (user) => {
  try {
    const isEmailExist = await User.findOne({
      where: {email: user.email}
    });
    
    if(isEmailExist) {
      throw new Error("Email already in use");
    }

    const password = hash(user.password);
    const newUser = await create({ ...user, password });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser };
