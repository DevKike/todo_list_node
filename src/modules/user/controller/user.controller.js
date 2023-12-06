const UserModel = require("../model/user.model");
const UserSchema = require("../schema/user.schema");

const createUser = (req, res) => {
  try {
    const { error, value } = UserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const { name, last_name, email, password } = value;

      const newUser = new UserModel(name, last_name, email, password);

      res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Error creating user" });
  }
};

module.exports = createUser;
