const express = require("express");
const admin = require("../../firebase-admin-init");
const { CART_ADD_ITEM } = require("../../constants/routes-paths");
const { validateCart } = require("../../models/cart");
const validateData = require("../../middlewares/common/validate-data");
const firestore = require("../../utils/func/firestore");

const cartAddItemRouter = express.Router();

cartAddItemRouter.post(
  CART_ADD_ITEM,
  validateData(validateCart),
  async (req, res) => {
    try {
      let cartRef;
      const { uid, itemID, type, quantity, name, price } = req.body;

      //Make sure the user and item exists within database
      if (!(await firestore.docExists(uid, "user")))
        return res
          .status(400)
          .json({ code: "400", error: "uid does not match with any user" });
      if (!(await firestore.docExists(itemID, type)))
        return res
          .status(400)
          .json({ code: "400", error: "itemID does not match with any item" });

      const cartQuerySnapshot = await admin
        .firestore()
        .collection("cart")
        .where("uid", "==", uid)
        .limit(1)
        .get();

      //Check if the cart exists for the current user
      // If the cart doesn't exists, then we create a new one for the user
      if (cartQuerySnapshot.empty) {
        cartRef = admin.firestore().collection("cart").doc();
        await cartRef.set({ id: cartRef.id, uid: uid });
      } else cartRef = cartQuerySnapshot.docs[0].ref; //If the cart exists, then take the ref

      //  Get the cart item ref
      const cartItemRef = cartRef.collection("items").doc(itemID);

      //Check if the item already exists within the cart: within the subcollection
      const itemExists = (await cartItemRef.get()).exists;

      if (itemExists)
        return res.status(409).json({
          code: "409",
          error: "Conflict: Item already exists within the cart",
        });

      //Adding item to the cart
      await cartItemRef.set({
        itemID: itemID,
        name: name,
        price: price,
        quantity: quantity,
        type: type,
      });

      return res
        .status(200)
        .json({ code: "200", message: "Item added to cart with success" });
    } catch (e) {
      return res.status(500).json({
        code: "500",
        error: "Error while adding item to Cart",
      });
    }
  }
);

module.exports = cartAddItemRouter;
