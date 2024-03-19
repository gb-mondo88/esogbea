const express = require("express");
const admin = require("../../firebase-admin-init");
const { TABLE_GET_ALL } = require("../../constants/routes-paths");

const tableGetAllRouter = express.Router();

tableGetAllRouter.get(TABLE_GET_ALL, async (req, res) => {
  try {
    //if there is a body provided in the req, then 400 error is sent
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "The req's body is not allowed",
      });

    const allTablesSnapshot = await admin.firestore().collection("table").get();

    // If the tables snapshot is empty, then 404 error is sent
    if (allTablesSnapshot.empty)
      return res.status(404).json({ code: "404", error: "No Table Found" });

    // Get tables data
    let tables = [];
    allTablesSnapshot.forEach((table) => {
      const tableData = table.data();
      tables.push(tableData);
    });

    //Sent the tables data to user;
    return res.status(200).json({
      code: "200",
      message: "Success",
      tablesSize: tables.length,
      tables: tables,
    });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the orders",
    });
  }
});

module.exports = tableGetAllRouter;
