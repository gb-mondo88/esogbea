const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const { docExists: itemExists } = require("../../utils/func/firestore");
const { ITEM_UNFAVORITE } = require("../../constants/routes-paths");

const itemUnfavoriteRouter = express.Router();

itemUnfavoriteRouter.delete(
  ITEM_UNFAVORITE,
  authenticate,
  authorize(["client"], true),
  async (req, res) => {
    try {
      const { id, uid } = req.params;

      if (!(await itemExists(id, "favorite")))
        return res.status(400).json({
          code: "400",
          error: `No record found with favorite item id: ${id}`,
        });
      if (!(await itemExists(uid, "user")))
        return res.status(400).json({
          code: "400",
          error: `No record found with user id: ${uid}`,
        });

      await admin.firestore().collection("favorite").doc(id).delete();
      return res
        .status(200)
        .json({ code: "200", message: "Item unfavorited with success" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = itemUnfavoriteRouter;
