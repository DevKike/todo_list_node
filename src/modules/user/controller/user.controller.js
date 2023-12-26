const { hash, compare } = require("../../../util/bcrypt");
const { signToken } = require("../../../util/jwtToken");
const register = require("../service/user.service");
const User = require("../model/user.model").User;

const registerUser = async (user) => {
  try {
    const isEmailExist = await User.findOne({ where: { email: user.email } });

    if (isEmailExist) {
      throw new Error("Email already in use");
    }

    const password = hash(user.password);
    const newUser = await register({ ...user, password });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect email or password");
    }

    const token = signToken(user.id);
    return token;
  } catch (error) {
    throw error;
  }
};

const getData = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Error getting user data' });
  }
}

module.exports = { registerUser, loginUser, getData};
