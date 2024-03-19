const express = require("express");
const admin = require("../../firebase-admin-init");
const { ITEM_GET_DRINKS } = require("../../constants/routes-paths");

const itemGetDrinksRouter = express.Router();

itemGetDrinksRouter.get(ITEM_GET_DRINKS, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    // Get the cart for the current user
    const drinkSnapshot = await admin.firestore().collection("drink").get();

    // If the cart query snapshot is empty, then 404 error is sent
    if (drinkSnapshot.empty)
      return res.status(404).json({ code: "404", error: "No drink found" });

    //Get drinks
    const drinks = [];

    drinkSnapshot.forEach((doc) => drinks.push(doc.data()));

    //Sent the cart data to user;
    return res
      .status(200)
      .json({ code: "200", message: "Success", drinks: drinks });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the cart",
    });
  }
});

module.exports = itemGetDrinksRouter;
