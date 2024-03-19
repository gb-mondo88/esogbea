const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const validate = require("../../middlewares/item/validate");
const itemTypeDetector = require("../../middlewares/item/item-type-detector");
const { ITEM_ADD } = require("../../constants/routes-paths");

const itemAddRouter = express.Router();

itemAddRouter.post(
  ITEM_ADD,
  authenticate,
  authorize(["admin"]),
  itemTypeDetector,
  validate.createData,
  async (req, res) => {
    try {
      const item = req.body;
      const itemRef = admin.firestore().collection(item.productType).doc();
      item.id = itemRef.id;
      await itemRef.set(item);
      return res.status(200).json({ code: "200", message: "Success" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = itemAddRouter;
