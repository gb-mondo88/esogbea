const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const { ADDRESS_GET_BY_ID } = require("../../constants/routes-paths");

const addressGetByIdRouter = express.Router();
addressGetByIdRouter.get(
  ADDRESS_GET_BY_ID,
  authenticate,
  authorize(["client"], true),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (Object.keys(req.body).length !== 0)
        return res
          .status(400)
          .json({ code: "400", error: "The body is not allowed" });

      const address = await admin
        .firestore()
        .collection("address")
        .doc(id)
        .get();

      if (!address.exists)
        return res.status(404).json({ code: "404", error: "No address found" });

      return res.status(200).json({
        code: "200",
        message: "Success",
        data: address.data(),
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = addressGetByIdRouter;
