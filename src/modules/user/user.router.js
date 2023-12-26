const express = require("express");
const { registerUser, loginUser } = require("./controller/user.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const UserSchema = require("./schema/user.schema");

const validateLoginSchema = schemaValidator(UserSchema);

const userRouter = express.Router();

userRouter.post("/register", schemaValidator(UserSchema), async (req, res) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    if (error.message === "Email already in use") {
      res.status(400).json({
        error: error.message
      });
    }else {
      res.status(500).json({
        message: "User not created"
      });
    }
  }
});

userRouter.post("/login", validateLoginSchema, async (req, res) => {
  try {
    const data = await loginUser(req.body);

    res.status().json({
      message: "user was successfully logged in",
      data,
    });
  } catch (error){
    res.status(500).json({
      message: "User login error",
      error: error.message,
    });
  }
})

module.exports = userRouter;
