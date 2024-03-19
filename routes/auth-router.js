const express = require("express");

const signUpRouter = require("./auth/user/sign-up");
const verifyEmailRouter = require("./auth/email/verify-email");
const sendVerificationLinkRouter = require("./auth/email/send-verification-link");
const getNewVerificationLinkPageRouter = require("./auth/email/get-new-verification-link-page");
const loginRouter = require("./auth/user/login");

const authRouter = express.Router();

authRouter.use(signUpRouter);
authRouter.use(verifyEmailRouter);
authRouter.use(sendVerificationLinkRouter);
authRouter.use(getNewVerificationLinkPageRouter);
authRouter.use(loginRouter);

module.exports = authRouter;
