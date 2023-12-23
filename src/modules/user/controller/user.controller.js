const { create } = require("../service/user.service");
const { hash, compare } = require("../../../util/bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../model/user.model").User;

const registerUser = async (user) => {
  try {
    const password = hash(user.password);
    const newUser = await create({ ...user, password });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: {email} });

    if (!user) {
      throw new Error("Email is not registered");
    }

    const passwordMatch = compare(password, user.password)


    if (passwordMatch) { 
      console.log("User was logged");
    } else {
      console.log("Passwords do not match");
    }

  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
