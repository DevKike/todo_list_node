const { hash, compare } = require("../../../util/bcrypt");
const { signToken } = require("../../../util/jwtToken");
const { register, findUserBy } = require("../service/user.service");

const registerUser = async (user) => {
  try {
    const isEmailExist = await findUserBy({ email: user.email })

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
    const user = await findUserBy({ email });

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

const getData = async (userId) => {
  try {
    const user = await findUserBy({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser, getData};
