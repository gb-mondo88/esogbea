const express = require("express");
const admin = require("../../firebase-admin-init");
const { TABLE_GETBY_ID } = require("../../constants/routes-paths");

const tableGetbyIdRouter = express.Router();

tableGetbyIdRouter.get(TABLE_GETBY_ID, async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "The req's body is not allowed",
      });

    const { id } = req.params;
    const tableGetbyIdRef = await admin
      .firestore()
      .collection("table")
      .doc(id)
      .get();

    // If the table snapshot is empty, then 404 error is sent
    if (!tableGetbyIdRef.exists)
      return res.status(404).json({ code: "404", error: "No Table Found" });

    // table data
    const table = tableGetbyIdRef.data();
    return res
      .status(200)
      .json({ code: "200", message: "Success", table: table });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the orders",
    });
  }
});

module.exports = tableGetbyIdRouter;
