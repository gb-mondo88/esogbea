const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const { validateAddress } = require("../../models/address");
const validate = require("../../middlewares/common/validate-data");
const { ADDRESS_ADD } = require("../../constants/routes-paths");

const addressAddRouter = express.Router();

addressAddRouter.post(
  ADDRESS_ADD,
  authenticate,
  authorize(["client"], true),
  validate(validateAddress),
  async (req, res) => {
    try {
      const address = req.body;
      const addressRef = admin.firestore().collection("address").doc();
      address.id = addressRef.id;
      await addressRef.set(address);
      return res
        .status(200)
        .json({ code: "200", message: "Address added with success" });
    } catch (e) {
      res.status(500).json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = addressAddRouter;
