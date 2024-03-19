const express = require("express");

const getUserByIdRouter = require("./user/get-user-by-id");

const userRouter = express.Router();

userRouter.use(getUserByIdRouter);

module.exports = userRouter;
