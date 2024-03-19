const express = require("express");
const admin = require("../../firebase-admin-init");
const { CART_EMPTY } = require("../../constants/routes-paths");

const cartEmptyRouter = express.Router();

cartEmptyRouter.delete(CART_EMPTY, async (req, res) => {
  try {
    // if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const { id } = req.params;

    // Get the cart's reference
    const cartRef = admin.firestore().collection("cart").doc(id);

    // If the cart doesn't exists,a 404 error code is sent
    if (!(await cartRef.get()).exists)
      return res
        .status(404)
        .json({ code: "404", error: "Cart does not exist" });

    // Get items available within the cart
    const itemsSnapshot = await cartRef.collection("items").get();

    // Check wether there is  at least one item within the cart
    if (itemsSnapshot.empty)
      return res.status(404).json({ code: "404", error: "No Item Found" });

    // Empty the cart
    const deletePromises = [];
    itemsSnapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    // Delete all items
    await Promise.all(deletePromises);

    return res
      .status(200)
      .json({ code: "200", message: "Cart emptied successfully" });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while emptying the cart",
    });
  }
});

module.exports = cartEmptyRouter;
