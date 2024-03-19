const express = require("express");
const admin = require("../../firebase-admin-init");
const { CART_DELETE_ITEM } = require("../../constants/routes-paths");

const cartDeleteItemRouter = express.Router();

cartDeleteItemRouter.delete(CART_DELETE_ITEM, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const { id, itemID } = req.params;

    // Get the cart's reference
    const cartRef = admin.firestore().collection("cart").doc(id);
    const cart = await cartRef.get();

    // If the cart doesn't exists,a 404 error code is sent
    if (!cart.exists)
      return res
        .status(404)
        .json({ code: "404", error: "Cart does not exist" });

    // Check wether the item exists or not within the cart
    const itemRef = cartRef.collection("items").doc(itemID);
    const item = await itemRef.get();
    if (!item.exists)
      return res
        .status(404)
        .json({ code: "404", error: "Item does not exist within the cart" });

    // Delete the item
    await itemRef.delete();

    return res
      .status(200)
      .json({ code: "200", message: "Item deleted successfully" });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while deleting item within cart",
    });
  }
});

module.exports = cartDeleteItemRouter;
