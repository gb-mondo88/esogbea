const express = require("express");
const admin = require("../../firebase-admin-init");
const { ITEM_GET_FOODS } = require("../../constants/routes-paths");

const itemGetFoodsRouter = express.Router();

itemGetFoodsRouter.get(ITEM_GET_FOODS, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    // Get the cart for the current user
    const foodSnapshot = await admin.firestore().collection("food").get();

    // If the cart query snapshot is empty, then 404 error is sent
    if (foodSnapshot.empty)
      return res.status(404).json({ code: "404", error: "No food found" });

    //Get drinks
    const foods = [];

    foodSnapshot.forEach((doc) => foods.push(doc.data()));

    //Sent the cart data to user;
    return res
      .status(200)
      .json({ code: "200", message: "Success", foods: foods });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the cart",
    });
  }
});

module.exports = itemGetFoodsRouter;
