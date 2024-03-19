const express = require("express");
const admin = require("../../firebase-admin-init");
const { TABLE_GETWITH_CAPACITY } = require("../../constants/routes-paths");

const tableGetwithCapacityRouter = express.Router();

tableGetwithCapacityRouter.get(TABLE_GETWITH_CAPACITY, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "The req's body is not allowed",
      });

    let capacity = req.params.capacity;
    const regex = /^\d+$/;
    if (!regex.test(capacity))
      return res
        .status(400)
        .json({ code: "400", error: "capacity value must be of type Int" });

    capacity = parseInt(capacity);
    // Get the tables with cqpqcity value
    const tablesQueryRef = admin
      .firestore()
      .collection("table")
      .where("capacity", "==", capacity);
    const tablesQuerySnapshot = await tablesQueryRef.get();

    // If the tables query snapshot is empty, then 404 error is sent
    if (tablesQuerySnapshot.empty)
      return res.status(200).json({
        code: "200",
        message: "No table is Available with this capacity",
        tablesSize: 0,
        tables: [],
      });

    // Get cart data
    let tables = [];
    tablesQuerySnapshot.forEach((table) => {
      tables.push(table.data());
    });

    //Sent the cart data to user;
    return res.status(200).json({
      code: "200",
      message: "Success",
      tablesSize: tables.length,
      tables: tables,
    });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the cart",
    });
  }
});

module.exports = tableGetwithCapacityRouter;
