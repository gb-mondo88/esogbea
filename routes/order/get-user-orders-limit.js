const express = require("express");
const admin = require("../../firebase-admin-init");
const { format } = require("date-fns");
const { USER_ORDERS_GET_LIMIT } = require("../../constants/routes-paths");

const getUserOrdersLimitRouter = express.Router();

getUserOrdersLimitRouter.get(USER_ORDERS_GET_LIMIT, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const userID = req.params.userID;
    let limit = req.params.limit;

    //if limit is not an int, sent 400 error
    const regex = /^\d+$/;
    if (!regex.test(limit))
      return res
        .status(400)
        .json({ code: "400", error: "limit value must be of type Int" });

    limit = parseInt(limit);

    if (limit === 0)
      return res
        .status(400)
        .json({ code: "400", error: "Min value for limit is 1" });

    // Get the cart for the current user
    const ordersQuery = admin
      .firestore()
      .collection("order")
      .where("userID", "==", userID)
      .limit(limit);
    const ordersQuerySnapshot = await ordersQuery.get();

    // If the order's query snapshot is empty, then 404 error is sent
    if (ordersQuerySnapshot.empty)
      return res
        .status(404)
        .json({ code: "404", error: "No Order Found For the User" });

    // Get orders data
    let orders = [];
    ordersQuerySnapshot.forEach((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt;
      const updatedAt = docData.updatedAt;

      const createdAtMilliSeconds =
        createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000;
      const updatedAtMilliSeconds =
        updatedAt._seconds * 1000 + updatedAt._nanoseconds / 1000000;
      docData.createdAt = format(
        createdAtMilliSeconds,
        "yyyy-MM-dd'T'HH:mm:ss.SSSX"
      );
      docData.updatedAt = format(
        updatedAtMilliSeconds,
        "yyyy-MM-dd'T'HH:mm:ss.SSSX"
      );
      orders.push(docData);
    });

    //Sent the orders data to user;
    return res.status(200).json({
      code: "200",
      message: "Success",
      ordersSize: orders.length,
      orders: orders,
    });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the orders",
    });
  }
});

module.exports = getUserOrdersLimitRouter;
