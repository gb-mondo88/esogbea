const express = require("express");
const admin = require("../../firebase-admin-init");
const { ORDER_DELETE } = require("../../constants/routes-paths");

const orderDeleteRouter = express.Router();

orderDeleteRouter.delete(ORDER_DELETE, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const { id } = req.params;

    // Get the order's reference
    const orderRef = admin.firestore().collection("order").doc(id);
    const order = await orderRef.get();

    // If the order doesn't exists,a 404 error code is sent
    if (!order.exists)
      return res
        .status(404)
        .json({ code: "404", error: "Order does not exist" });

    // Delete the order
    await orderRef.delete();

    return res
      .status(200)
      .json({ code: "200", message: "Order deleted successfully" });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while deleting Order",
    });
  }
});

module.exports = orderDeleteRouter;
