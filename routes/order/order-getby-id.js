const express = require("express");
const admin = require("../../firebase-admin-init");
const { format } = require("date-fns");
const { ORDER_GETBY_ID } = require("../../constants/routes-paths");

const orderGetbyIdRouter = express.Router();

orderGetbyIdRouter.get(ORDER_GETBY_ID, async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const { id } = req.params;
    const orderGetbyIdRef = await admin
      .firestore()
      .collection("order")
      .doc(id)
      .get();

    // If the order snapshot is empty, then 404 error is sent
    if (!orderGetbyIdRef.exists)
      return res.status(404).json({ code: "404", error: "No Order Found" });

    // Get orders data

    const order = orderGetbyIdRef.data();

    const createdAt = order.createdAt;
    const updatedAt = order.updatedAt;

    const createdAtMilliSeconds =
      createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000;
    const updatedAtMilliSeconds =
      updatedAt._seconds * 1000 + updatedAt._nanoseconds / 1000000;
    order.createdAt = format(
      createdAtMilliSeconds,
      "yyyy-MM-dd'T'HH:mm:ss.SSSX"
    );
    order.updatedAt = format(
      updatedAtMilliSeconds,
      "yyyy-MM-dd'T'HH:mm:ss.SSSX"
    );

    return res
      .status(200)
      .json({ code: "200", message: "Success", order: order });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the orders",
    });
  }
});

module.exports = orderGetbyIdRouter;
