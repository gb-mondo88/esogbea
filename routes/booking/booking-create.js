const express = require("express");
const admin = require("../../firebase-admin-init");
const { BOOKING_CREATE } = require("../../constants/routes-paths");
const { validateBooking } = require("../../models/booking");
const validateData = require("../../middlewares/common/validate-data");

const bookingCreateRouter = express.Router();

bookingCreateRouter.post(
  BOOKING_CREATE,
  validateData(validateBooking),
  async (req, res) => {
    try {
      const booking = req.body;
      const bookingRef = admin.firestore().collection("booking").doc();
      await bookingRef.set({
        ...booking,
        id: bookingRef.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return res
        .status(200)
        .json({ code: "200", message: "Booking created with Success" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ code: "500", error: "Internal Server Errror" });
    }
  }
);

module.exports = bookingCreateRouter;
