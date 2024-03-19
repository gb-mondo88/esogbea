const express = require("express");
const bcryptjs = require("bcryptjs");
const admin = require("../../../firebase-admin-init");
const validateUserData = require("../../../models/user");
const validateData = require("../../../middlewares/common/validate-data");
const { emailExists } = require("../../../utils/func/firestore");
const sendLink = require("../../../utils/func/send-link");
const { AUTH_SIGN_UP } = require("../../../constants/routes-paths");

// route assignment
const signUpRouter = express.Router();

// Post request
signUpRouter.post(
  AUTH_SIGN_UP,
  validateData(validateUserData),
  async (req, res) => {
    try {
      const user = { ...req.body };
      const emailUsed = await emailExists(user.email);

      if (emailUsed)
        return res.status(400).json({
          code: "400",
          error: "User with the same email already exists",
        });

      user.password = await bcryptjs.hash(user.password, 10);

      const userRef = admin.firestore().collection("user").doc();
      user.uid = userRef.id;

      // Create user within the database.
      await userRef.set({
        ...user,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      //Send link to user
      sendLink(user.email);

      return res
        .status(200)
        .json({ code: "200", message: "User created with success" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = signUpRouter;
