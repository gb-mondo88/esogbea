const express = require("express");
const admin = require("../../firebase-admin-init");
const { TABLE_GET_AVAILABLE } = require("../../constants/routes-paths");

const tableGetAvailableRouter = express.Router();

tableGetAvailableRouter.get(TABLE_GET_AVAILABLE, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "The req's body is not allowed",
      });

    // Get the tables available
    const tablesQueryRef = admin
      .firestore()
      .collection("table")
      .where("isAvailable", "==", true);
    const tablesQuerySnapshot = await tablesQueryRef.get();

    // If the tables query snapshot is empty, then 404 error is sent
    if (tablesQuerySnapshot.empty)
      return res.status(200).json({
        code: "200",
        message: "No table is Available",
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

module.exports = tableGetAvailableRouter;
