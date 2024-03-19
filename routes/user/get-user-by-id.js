const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const userData = require("../../utils/func/user-data");
const { USER_GET_BY_ID } = require("../../constants/routes-paths");

const getUserByIdRouter = express.Router();

getUserByIdRouter.get(
  USER_GET_BY_ID,
  authenticate,
  authorize(["admin", "client"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await admin.firestore().collection("user").doc(id).get();
      if (!doc.exists)
        return res
          .status(404)
          .json({ code: "404", error: "No user found with this id" });
      const user = userData.getAllowedFields(doc.data());
      return res
        .status(200)
        .json({ code: "200", message: "Success", user: user });
    } catch (e) {
      return res
        .status(500)
        .json({ code: 500, error: "Internal Server Error" });
    }
  }
);

module.exports = getUserByIdRouter;
