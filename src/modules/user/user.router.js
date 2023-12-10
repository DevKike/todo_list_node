const express = require("express");
const { createUser } = require("./controller/user.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const UserSchema = require("./schema/user.schema");

const userRouter = express.Router();

userRouter.post("/", schemaValidator(UserSchema), async (req, res) => {
  try {
    const data = await createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not created",
    });
  }
});

module.exports = userRouter;
