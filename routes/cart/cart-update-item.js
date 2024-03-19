const express = require("express");
const admin = require("../../firebase-admin-init");
const { CART_UPDATE_ITEM } = require("../../constants/routes-paths");
const { validateCartUpdate } = require("../../models/cart");
const validateData = require("../../middlewares/common/validate-data");

const cartUpdateItemRouter = express.Router();

cartUpdateItemRouter.put(
  CART_UPDATE_ITEM,
  validateData(validateCartUpdate),
  async (req, res) => {
    try {
      const { quantity } = req.body;
      const { id, itemID } = req.params;

      //if no field is provide for update, 400 error is sent
      if (!quantity)
        return res
          .status(400)
          .json({ code: "400", error: "No field provided for upate" });

      // Get the cart's reference
      const cartRef = admin.firestore().collection("cart").doc(id);
      const cart = await cartRef.get();

      // If the cart doesn't exists,a 404 error code is sent
      if (!cart.exists)
        return res
          .status(404)
          .json({ code: "404", error: "Cart does not exist" });

      // If the item doesn't exist within the cart, a 404 error code is sent
      const itemRef = cartRef.collection("items").doc(itemID);
      const item = await itemRef.get();

      if (!item.exists)
        return res
          .status(404)
          .json({ code: "404", error: "Item does not exist within the cart" });

      // Update the item
      await itemRef.update({ quantity: quantity });

      return res
        .status(200)
        .json({ code: "200", message: "Item updated successfully" });
    } catch (e) {
      return res.status(500).json({
        code: "500",
        error: "Error while updating item within cart",
      });
    }
  }
);

module.exports = cartUpdateItemRouter;
