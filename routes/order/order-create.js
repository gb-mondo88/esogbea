const express = require("express");
const admin = require("../../firebase-admin-init");
const { ORDER_CREATE } = require("../../constants/routes-paths");
const getOrderItems = require("../../middlewares/order/get-order-items");
const getOrderItemsPrice = require("../../middlewares/order/get-order-items-price");
const { validateOrderData } = require("../../models/order");
const validateData = require("../../middlewares/common/validate-data");

const orderCreateRouter = express.Router();

orderCreateRouter.post(
  ORDER_CREATE,
  validateData(validateOrderData),
  getOrderItems,
  getOrderItemsPrice,
  async (req, res) => {
    try {
      const orderData = req.body;
      const orderRef = admin.firestore().collection("order").doc();
      await orderRef.set({
        ...orderData,
        id: orderRef.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return res
        .status(200)
        .json({ code: "200", message: "Order Created with Success" });
    } catch (error) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Errror" });
    }
  }
);

module.exports = orderCreateRouter;
