const express = require("express");
const admin = require("../../firebase-admin-init");
const { ITEM_GET_BY_ID } = require("../../constants/routes-paths");

const itemGetByIdRouter = express.Router();

itemGetByIdRouter.get(ITEM_GET_BY_ID, async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 0)
      return res.status(400).json({
        code: "400",
        error: "Bad Request: The req's body is not allowed",
      });

    const { id, type } = req.params;
    const itemGetByIdRef = await admin
      .firestore()
      .collection(type)
      .doc(id)
      .get();

    // If the order snapshot is empty, then 404 error is sent
    if (!itemGetByIdRef.exists)
      return res.status(404).json({ code: "404", error: "No Item Found" });

    // Get orders data

    const item = itemGetByIdRef.data();

    return res
      .status(200)
      .json({ code: "200", message: "Success", item: item });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      error: "Error while getting the orders",
    });
  }
});

module.exports = itemGetByIdRouter;
