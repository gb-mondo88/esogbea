const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const { USER_ADDRESS_GET } = require("../../constants/routes-paths");

const userGetAddressRouter = express.Router();
userGetAddressRouter.get(
  USER_ADDRESS_GET,
  authenticate,
  authorize(["client"], true),
  async (req, res) => {
    try {
      const { uid } = req.params;

      if (Object.keys(req.body).length !== 0)
        return res
          .status(400)
          .json({ code: "400", error: "The body is not allowed" });

      const snapshot = await admin
        .firestore()
        .collection("address")
        .where("uid", "==", uid)
        .get();

      if (snapshot.empty)
        return res.status(404).json({
          code: "404",
          error: "No address found for user with uid: " + uid,
        });
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });

      return res.status(200).json({
        code: "200",
        message: "Success",
        data: data,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = userGetAddressRouter;
