const express = require("express");
const admin = require("../../firebase-admin-init");
const authenticate = require("../../middlewares/auth/authenticate");
const authorize = require("../../middlewares/auth/authorize");
const {
  docExists: itemExists,
  fieldExists,
} = require("../../utils/func/firestore");
const validateData = require("../../middlewares/common/validate-data");
const { validateFavorite } = require("../../models/favorite");
const { ITEM_FAVORITE } = require("../../constants/routes-paths");

const itemFavoriteRouter = express.Router();

itemFavoriteRouter.post(
  ITEM_FAVORITE,
  authenticate,
  authorize(["client"], true),
  validateData(validateFavorite),
  async (req, res) => {
    try {
      const favorite = req.body;
      const uid = req.params.uid;

      if (
        !(await itemExists(favorite.itemID, "food")) &&
        !(await itemExists(favorite.itemID, "drink"))
      )
        return res.status(400).json({
          code: "400",
          error: `No record found with itemID: ${favorite.itemID}`,
        });
      if (!(await itemExists(favorite.userID, "user")))
        return res.status(400).json({
          code: "400",
          error: `No record found with userID: ${favorite.userID}`,
        });

      if (!(uid && uid === favorite.userID))
        return res
          .status(403)
          .json({ code: "403", error: "Forbidden: Not authorize" });

      if (await fieldExists("itemID", favorite.itemID, "favorite"))
        return res
          .status(400)
          .json({ code: "400", error: "Item already favorited" });

      const favoriteRef = admin.firestore().collection("favorite").doc();
      favorite.id = favoriteRef.id;
      await favoriteRef.set(favorite);
      return res
        .status(200)
        .json({ code: "200", message: "Item added to favorites with success" });
    } catch (e) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Error" });
    }
  }
);

module.exports = itemFavoriteRouter;
