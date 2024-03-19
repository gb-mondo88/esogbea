const express = require("express");
const admin = require("../../firebase-admin-init");
const { USER_CART_GET } = require("../../constants/routes-paths");

const getUserCartRouter = express.Router();

getUserCartRouter.get(USER_CART_GET, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const { uid } = req.params;

    // Get the cart for the current user
    const cartSnapshot = await admin
      .firestore()
      .collection("cart")
      .where("uid", "==", uid)
      .get();

    // If the cart query snapshot is empty, then 404 error is sent
    if (cartSnapshot.empty)
      return res
        .status(404)
        .json({ code: "404", error: "No cart found for the user" });

    // Get cart data
    const cartRef = cartSnapshot.docs[0].ref;
    const itemsSnapshot = await cartRef.collection("items").get();
    const items = [];

    if (!itemsSnapshot.empty)
      itemsSnapshot.forEach((doc) => items.push(doc.data()));
    const cart = { ...cartSnapshot.docs[0].data(), items: items };

    //Sent the cart data to user;
    return res
      .status(200)
      .json({ code: "200", message: "Success", cart: cart });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the cart",
    });
  }
});

module.exports = getUserCartRouter;
