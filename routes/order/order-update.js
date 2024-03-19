const express = require("express");
const admin = require("../../firebase-admin-init");
const { ORDER_UPDATE } = require("../../constants/routes-paths");
const { validateOrderUpdateData } = require("../../models/order");
const validateData = require("../../middlewares/common/validate-data");

const orderUpdateRouter = express.Router();

orderUpdateRouter.put(
  ORDER_UPDATE,
  validateData(validateOrderUpdateData),
  async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0)
        return res.status(400).json({
          code: "400",
          error: "No field provided for update",
        });
      const updatedData = req.body;
      const { id } = req.params;
      const orderRef = admin.firestore().collection("order").doc(id);
      const orderDoc = await orderRef.get();
      if (!orderDoc.exists)
        return res
          .status(404)
          .json({ code: "404", error: "No Order Found with this ID" });

      const nestedObjectsKey = Object.keys(req.body).filter(
        (key) => typeof req.body[key] === "object"
      );
      nestedObjectsKey.forEach((key) => {
        for (const nestedKey in req.body[key]) {
          const field = key + "." + nestedKey;
          req.body[field] = req.body[key][nestedKey];
        }

        delete req.body[key];
      });

      await orderRef.update(updatedData);

      return res
        .status(200)
        .json({ code: "200", message: "Order Updated with Success" });
    } catch (error) {
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Errror" });
    }
  }
);

module.exports = orderUpdateRouter;
