const express = require("express");
const { registerUser, loginUser, getData } = require("./controller/user.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const { registerSchema, loginSchema } = require("./schema/user.schema");
const authToken = require("../../middleware/authToken.middleware");

const userRouter = express.Router();

userRouter.post("/register",schemaValidator(registerSchema), async (req, res) => {
    try {
      const data = await registerUser(req.body);

      res.status(201).json({
        message: "User created successfully",
        data,
      });
    } catch (error) {
      if (error.message === "Email already in use") {
        res.status(400).json({
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "User not created",
        });
      }
    }
  }
);

userRouter.post("/login", schemaValidator(loginSchema), async (req, res) => {
  try {
    const token = await loginUser(req.body);

    res.status(200).json({
      message: "user was successfully logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "User login error",
      error: error.message,
    });
  }
});

userRouter.get("/data", authToken(), getData)

module.exports = userRouter;
