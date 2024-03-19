const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const validate = require("../../middlewares/item/validate");
const { ITEM_UPDATE } = require("../../constants/routes-paths");

const itemUpdateRouter = express.Router();

itemUpdateRouter.put(
  ITEM_UPDATE,
  authenticate,
  authorize(["admin"]),
  validate.updateData,
  async (req, res) => {
    try {
      const { id, type } = req.params;
      const item = req.body;
      await admin.firestore().collection(type).doc(id).update(item);

      return res
        .status(200)
        .json({ code: "200", message: "Update with Success" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = itemUpdateRouter;
